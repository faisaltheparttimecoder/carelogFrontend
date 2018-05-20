<!--The main rssReader component-->
<template>
  <section class="section">
    <!--Modal to add and edit rss fields-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal :title="modalTitle">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Rss Feed')">
        </app-form>
      </app-modal>
    </b-modal>
    <!--Spilt the container into two grids one half for menu and other for the content-->
    <div class="columns">
      <!--menu grid-->
      <div class="column is-2">
        <app-menu :menuItems="menuItems"
                  :menuTitle="menuTitle"
                  :sourceUrl="sourceUrl"
                  :sourceTitle="sourceTitle"
                  :selectedItem="selectedItem"
                  :menuModification="true"
                  :sourceInfo=true
                  v-on:refreshContent="clickedContent"
                  v-on:updateItem="updateItem"
                  v-on:deleteItem="confirmDelete($event, 'Rss Feed')">
          <!--Extra contents for the menu-->
          <div slot="menuTop">
            <p class="menu-label has-text-weight-bold has-text-primary">
              Action
            </p>
            <div class="field">
              <p class="control">
                <a class="button is-outlined" v-on:click="addClicked">
                  <span class="icon is-small">
                    <i class="fas fa-rss-square"></i>
                  </span>
                  <span>New Feed Source</span>
                </a>
              </p>
            </div>
          </div>
        </app-menu>
      </div>
      <!--rss content grid-->
      <div class="column is-10">
        <app-content :rssContent="rssContent" :rssTitle="selectedItem"> </app-content>
      </div>
    </div>
  </section>
</template>

<script>
  // Import components & mixins
  import content from './content'
  export default {
    name: 'rssReader',
    components: {
      'app-content': content
    },
    data: function () {
      return {
        menuTitle: 'Rss Feeder',
        menuItems: [],
        rssContent: [],
        sourceUrl: 'https://pivotal.io/security',
        sourceTitle: 'Security Page',
        showModal: false,
        modalTitle: '',
        selectedItem: '',
        formData: {},
        formFields: {
          name: {
            formtype: 'input',
            label: 'Feed Name',
            placeholder: "Enter feed name...",
            validate: 'required|alpha_spaces|max:100',
            icon: 'far fa-id-card'
          },
          url: {
            formtype: 'input',
            label: 'Feed URL',
            placeholder: "Enter feed url...",
            validate: 'required|url|max:500',
            icon: 'fas fa-external-link-alt'
          }
        }
      }
    },
    methods: {
      // Add Clicked
      addClicked: function() {
        this.showModal = true
        this.modalTitle = 'Add'
        this.formData = {
          id: '',
          name: "",
          url: ""
        }
      },
      // If request open the form to edit the field.
      updateItem: function (data) {
        this.showModal = true
        this.modalTitle = 'Update'
        this.formData = data
      },
      // Save the data from the form field
      saveData: function (event) {
        event.name = this.capitalizeFirstLetter(event.name)
        if (event.id === '') { // Create a new feed
          this.post(this.api.security, event).then(response => {
            this.menuItems.push(response)
            this.showModal = false
            this.notice(this.rssPostSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.rssPostFailure, error)
          })
        } else { // Update the existing feed.
          this.patch(this.api.security + event.id + '/', event).then(response => {
            this.menuItems = this.updateElement(this.menuItems, event.id, response)
            this.selectedItem = response.name
            this.clickedContent(event.id)
            this.showModal = false
            this.notice(this.rssPostSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.rssPostFailure, error)
          })
        }
      },
      // Delete data if requested.
      deleteData: function (id) {
        this.delete(this.api.security + id + '/').then(response => {
          this.removeElement(this.menuItems, id)
          this.notice(this.rssDeleteSuccess, 'success', 'success')
          this.getMenuItem()
        }).catch(error => {
          this.errorParser(this.rssDeleteFailure, error)
        })
      },
      // Get all the contents of the rss feed.
      clickedContent: function (id) {
        this.get(this.api.security + id + '/').then(response => {
          this.selectedItem = response.name
          this.rssContent = response.content
        }).catch(error => {
          this.errorParser(this.rssContentFailure, error)
        })
      },
      // pull the menu item based on load or delete
      getMenuItem: function () {
        var item = this.pickMenuItem(this.menuItems)
        if (item === '') {
          this.rssContent = []
        } else {
          this.clickedContent(item)
        }
      },
    },
    // Load all the rss feed location we know about
    created: function () {
      this.get(this.api.security).then(response => {
        this.menuItems = response
        this.getMenuItem()
      }).catch(error => {
        this.errorParser(this.rssLoadFailure, error)
      })
      this.$store.dispatch('activeNavbarAction', 'Security')
    }
  }
</script>

<style scoped>
</style>
