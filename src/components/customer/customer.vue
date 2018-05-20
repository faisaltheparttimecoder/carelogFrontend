<!--Customer menu -->
<template>
  <section>
    <!--Modal to modify the customer list-->
    <b-modal :active.sync="modifyModal" has-modal-card>
      <app-modal title="Modify Customer">
        <app-modify-modal :customerList.sync="menuItems"
                          slot="modal-body"
                          @deleteOrg="removeOrg"
                          @updateOrg="updateOrg">
        </app-modify-modal>
      </app-modal>
    </b-modal>
    <!--Modal to add customer-->
    <b-modal :active.sync="addModal" has-modal-card>
      <app-modal title="Find & Add Customer">
        <app-add-modal slot="modal-body"
                       :countriesList="countriesList"
                       @newOrg="newOrg">
        </app-add-modal>
      </app-modal>
    </b-modal>
    <!--Reuse the menu component to generate the customer menu-->
    <app-menu :menu-items="unarchivedCustomers"
              :selectedItem="selectedItem"
              menuTitle="Customers"
              :sourceInfo=infoSource
              sourceTitle="Zendesk"
              sourceUrl="https://discuss.zendesk.com/"
              v-on:refreshContent="clickedContent($event)">
      <!--Extra contents for the menu-->
      <div slot="menuTop">
        <!--Button to add new category-->
        <p class="menu-label has-text-primary has-text-weight-bold">
          Action
        </p>
        <!--New customer button-->
        <div class="field">
          <p class="control">
            <a class="button is-outlined" @click="addModal = true">
              <span class="icon is-small">
                <i class="far fa-building"></i>
              </span>
              <span>&nbsp;&nbsp; Add Customer &nbsp;&nbsp;&nbsp;&nbsp;</span>
            </a>
          </p>
        </div>
        <!--Modify customer button-->
        <div class="field">
          <p class="control">
            <a class="button is-outlined" @click="modifyModal = true">
              <span class="icon is-small">
                <i class="fas fa-wrench"></i>
              </span>
              <span>&nbsp;&nbsp; Modify Customer</span>
            </a>
          </p>
        </div>
      </div>
      <!--Archived customers list-->
      <div slot="menuBottom">
        <p class="menu-label has-text-weight-bold has-text-primary">
          Archived Customers
        </p>
        <ul class="menu-list">
          <li v-for="menuItem in archivedCustomers">
            <a class="heading is-disabled" >
              {{ menuItem.name }}
            </a>
          </li>
        </ul>
      </div>
    </app-menu>
  </section>
</template>

<script>
  import modify from './modify'
  import add from './search'
  export default {
    props: [
      'infoSource'
    ],
    components: {
      'app-modify-modal': modify,
      'app-add-modal': add
    },
    data: function () {
      return {
        countriesList: [],
        menuItems: [],
        unarchivedCustomers: [],
        archivedCustomers: [],
        selectedItem: '',
        modifyModal: false,
        addModal: false,
      }
    },
    methods: {
      // Segregate the customers into archive and unarchived customer
      archiveCustomer: function() {
        for (let i in this.menuItems) {
          if (this.menuItems[i]['archived']) {
            this.archivedCustomers.push(this.menuItems[i])
          } else {
            this.unarchivedCustomers.push(this.menuItems[i])
          }
        }
      },
      // If the user has modified the org, update the archive & unarchived list
      updateArchive: function () {
        this.archivedCustomers = []
        this.unarchivedCustomers = []
        this.archiveCustomer()
        this.modifyModal = false
        this.addModal = false
      },
      // If the user asked to remove the item then remove it from the array and
      // update the archive & unarchived list
      removeOrg: function (event) {
        this.removeElement(this.menuItems, event)
        this.updateArchive()
      },
      // If the user has asked to archive the org, then run the stuff below
      updateOrg: function (id, data) {
        this.updateElement(this.menuItems, id, data)
        this.updateArchive()
      },
      // New Customer push the data to the list
      newOrg: function (event) {
        this.menuItems.push(event)
        this.updateArchive()
      },
      // Clicked Customer name
      clickedContent: function (event) {
        this.get(this.api.org + event + '/').then(response => {
          this.selectedItem = response.name
          return this.$emit('selectedOrg', {
            zendesk_org_id: response.org_id,
            org_id: response.id,
            recently_added: response.recently_added,
            who: 'customer'
          })
        })
      }
    },
    // When the page loads, pull all the customer &
    // List of countries in a async operations
    created: function () {
      // List of customers.
      this.get(this.api.org).then(response => {
        this.menuItems = response
        this.archiveCustomer()
        this.clickedContent(this.pickMenuItem(this.unarchivedCustomers))
      }).catch(error => {
        this.errorParser(this.customerLoadFailure, error)
      })
      // List of all the countries.
      this.get(this.api.country).then(response => {
        for (let i in response) {
          this.countriesList.push({
            id: response[i].name,
            name: response[i].name
          })
        }
      }).catch(error => {
        this.errorParser(this.countryListLoadFailure, error)
      })
    },
  }
</script>

<style>
  .is-disabled {
    cursor: no-drop;
    background-color: white;
  }
  a.is-disabled:hover {
    background-color: white;
  }
</style>
