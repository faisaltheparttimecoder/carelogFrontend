<template>
  <section>
    <app-menu :menu-items="menuItems" :selectedItem="selectedItem" :menuTitle="menuTitle" :sourceInfo=infoSource
              :sourceUrl="sourceUrl" :sourceTitle="sourceTitle" v-on:refreshContent="clickedContent($event)">

      <!--Extra contents for the menu-->
      <div slot="menuTop">

        <!--Button to add new category-->
        <p class="menu-label has-text-primary has-text-weight-bold">
          Action
        </p>

        <!--New customer button-->
        <div v-if="!menuFormActive" class="field">
          <p class="control">
            <a class="button is-outlined" v-on:click="activateCustomerSearch">
              <span class="icon is-small">
                <i class="far fa-building"></i>
              </span>
              <span>Find & Add Customer</span>
            </a>
          </p>
        </div>

        <!--Search for the customer -->
        <div v-if="menuFormActive">
          <b-field>
            <b-autocomplete rounded v-model="name" :data="data" icon="magnify" placeholder="Search Customer ..."
                            field="name" :loading="isFetching" @input="getAsyncData"
                            @select="option => selected = option">

              <template slot-scope="props">
                <div class="media">
                  <div class="media-content">
                    <strong>{{ props.option.name }}</strong>
                    <br>
                    <small>
                      <strong>Created at:</strong> {{ dateFormat(props.option.created_at) }}
                      <br>
                      <strong>Location:</strong> {{ trimLocation(props.option.organization_fields.customer_location) }}
                    </small>
                  </div>
                </div>
              </template>
            </b-autocomplete>
          </b-field>
          <a class="button is-success is-outlined" v-on:click="addCustomer"> Save </a>
          <a class="button is-danger is-outlined" v-on:click="menuFormActive = false"> Cancel </a>
        </div>

      </div>
    </app-menu>
  </section>
</template>

<script>
  import menu from './../core/menu'
  import debounce from 'lodash.debounce'
  import helpers from './../../mixins/helper'
  import defaults from './../../mixins/default'

  var qs = require('qs')

  export default {
    components: {
      'app-menu': menu
    },
    props: [
      'infoSource'
    ],
    mixins: [
      helpers, defaults
    ],
    data() {
      return {
        data: [],
        selectedItem: [],
        name: '',
        selected: null,
        isFetching: false,
        menuTitle: 'Customers',
        menuItems: [],
        sourceUrl: 'https://discuss.zendesk.com/',
        sourceTitle: 'Zendesk'
      }
    },
    created: function () {
      this.axios.get(this.api.org).then(response => {
        this.menuItems = response.data

        if (!this.arrayEmpty(this.menuItems)) {
          this.clickedContent(this.menuItems[0]['id'])
        }
      })
    },
    methods: {
      // Send the clicked content information to the calling components
      clickedContent: function (clicked) {
        this.axios.get(this.api.org + clicked + '/').then(response => {
          this.selectedItem = response.data.name
          return this.$emit('selectedOrg', {
            event: response.data.org_id,
            org_id: response.data.id,
            recently_added: response.data.recently_added,
            who: 'customer'
          })
        })
      },
      // You have to install and import debounce to use it,
      // it's not mandatory though.
      getAsyncData: debounce(function () {
        this.data = []
        this.isFetching = true
        var url = this.api.search + 'organization name:'
        this.axios.get(url + this.name + '*')
          .then(({
                   data
                 }) => {
            data.results.forEach((item) => this.data.push(item))
            this.isFetching = false
          })
          .catch((error) => {
            this.isFetching = false
          })
      }, 500),
      // Activate Search field.
      activateCustomerSearch: function () {
        this.name = ''
        this.menuFormActive = true
      },
      // Formating the location
      trimLocation: function (data) {
        if (data !== null) {
          return data.slice(9,).toUpperCase()
        }
      },
      // Save the new customers.
      addCustomer: function () {
        // Check if user actually selected the organization from the list
        if (this.selected === null) {
          this.emitMessage("ERROR: The Organisation name doesn't exists", 'is-danger')
          return false
        }
        // All good lets save the entry on the database.
        var saveOrg = {
          org_id: this.selected.id,
          name: this.selected.name,
          created_at: this.dateFormat(this.selected.created_at),
          location: this.selected.organization_fields.customer_location,
          expired_contract: this.selected.organization_fields.expired_contract,
          recently_added: true
        }
        this.axios.post(this.api.org, qs.stringify(saveOrg)).then(response => {
          if (response.statusText === 'Created' && response.status === 201) {
            this.menuFormActive = false
            this.menuItems.push(response.data)
            this.emitMessage('Customer Successfully Registered', 'is-success')
          } else {
            console.log(response)
            this.emitMessage('FAILURE: Customer Registration Unsuccessful, check browser console log', 'is-danger')
          }
        }).catch(error => {
          console.log(error)
          console.log(error.response.data)
          this.emitMessage("ERROR: Failed to save the customer on the database, check browser console log.", 'is-danger')
        })
      }
    }
  }
</script>

<style>

</style>
