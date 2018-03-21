<template>
  <section class="section">
    <div class="columns">

      <div class="column is-2">
        <app-menu
          :menu-items="menuItems"
          :selectedItem='selectedItem'
          :menuTitle="'Categories'"
          :sourceInfo=false
          :allActive=true
          v-on:refreshContent="clickedContent($event)"
          v-on:allContent="allContent">

          <!--Extra contents for the menu-->
          <div slot="menuTop">

            <!--Button to add new category-->
            <p class="menu-label has-text-danger has-text-weight-bold">
              Action
            </p>

            <!--The form to add a new category-->
            <app-category v-on:updatedMenuItem="updateMenu"> </app-category>

          </div>

        </app-menu>
      </div>

      <div class="column is-10">

        <!--Top navbar-->
        <nav class="level">
          <div class="level-left">
            <h1 class="title">
              {{ selectedItem }}
            </h1>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a class="button is-success is-outlined" @click="openNewModal">
                <span class="icon is-small">
                  <i class="fas fa-link"></i>
                </span>
                <span> Register Link</span>
              </a>
            </div>
            <div class="level-item">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <input class="input is-rounded" v-model="searchLinks" type="text" placeholder="Search...">
                  <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!--Add & Edit new link-->
        <b-modal :active.sync="addEditModal" has-modal-card>
          <modal-addEdit :modalProp="modalProp"
                         :categories="menuItems"
                         :is_it_edit="is_it_edit"
                         v-on:newLink="addNewLink"
                         v-on:updateLink="updateEditLink">
          </modal-addEdit>
        </b-modal>

        <!--If content doesn't exists-->
        <app-nocontent v-if="contextExists" :message="noContentMessage"> </app-nocontent>

        <!--Table of information-->
        <div v-else class="columns">
          <app-table :data="arraySlicer(filterLinks, 0)" v-on:editLink="openEditModal" v-on:deleteLink="deleteLink"> </app-table>
          <app-table :data="arraySlicer(filterLinks, 1)" v-on:editLink="openEditModal" v-on:deleteLink="deleteLink"> </app-table>
          <app-table :data="arraySlicer(filterLinks, 2)" v-on:editLink="openEditModal" v-on:deleteLink="deleteLink"> </app-table>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
  import addEditLink from './addlink'
  import menu from './../core/menu'
  import tabTemplate from './tabletemplate'
  import helper from './../../mixins/helper'
  import defaults from './../../mixins/default'
  import addCategory from './addcategory'
  import noContent from '../core/nocontent'

  export default {
    name: 'links',
    mixins: [
      helper, defaults
    ],
    components: {
      'modal-addEdit': addEditLink,
      'app-menu': menu,
      'app-table': tabTemplate,
      'app-category': addCategory,
      'app-nocontent': noContent,
    },
    data: function () {
      return {
        addEditModal: false,
        is_it_edit: false,
        searchLinks: '',
        tableData: [{
          id: '',
          name: '',
          url: '',
          info: '',
          category_id: '',
          category_name: ''}],
        modalProp: {
          modalTitle: "Register New Link",
          linkId: '',
          linkCategory: '',
          linkName: '',
          linkUrl: '',
          linkInfo: ''
        },
        noContentMessage: 'This category dont have any URL, add one using the register new link button'
      }
    },
    computed: {
      // Use the filter to filter out the content based on user search.
      filterLinks: function() {
        return this.tableData.filter((links) => {
          return links.name.toLowerCase().includes(this.searchLinks.toLowerCase()) || links.info.toLowerCase().includes(this.searchLinks.toLowerCase())
        })
      }
    },

    // Attaching the lifecycle hook, to pull the API.
    created: function() {
      // All the categories
      this.axios.get(this.api.category).then(response => {
        this.menuItems = response.data
      })
      // All the links
      this.axios.get(this.api.links).then(response => {
        this.tableData = response.data
        this.selectedItem = 'All Categories Links'
        this.contextExists = this.arrayEmpty(this.tableData)
      })
    },

    methods: {

      // Update the menu item when the new category is added.
      updateMenu: function(newMenuItem) {
        this.menuItems.push(newMenuItem)
      },

      // Open modal to add a new link
      openNewModal: function() {
        // Set the values and open the modal
        this.modalProp =  {
          modalTitle: "Register New Link",
          linkId: '',
          linkCategory: '',
          linkName: '',
          linkUrl: '',
          linkInfo: ''
        }
        this.addEditModal = true
        this.is_it_edit = false
      },

      // Add new link
      addNewLink: function(link) {
        // only update the table if the category name is the selected one
        if (this.selectedItem === 'All Categories Links' || this.selectedItem === link.category_name) {
          this.tableData.push(link)
        }
        this.contextExists = this.arrayEmpty(this.tableData)
      },

      // Edit the link
      openEditModal: function(linkInfo) {
        // Set the values and open the modal
        this.modalProp = {
          modalTitle: "Edit Link",
          linkId: linkInfo.linkId,
          linkCategory: linkInfo.linkCategory,
          linkName: linkInfo.linkName,
          linkUrl: linkInfo.linkUrl,
          linkInfo: linkInfo.linkInfo
        }
        this.addEditModal = true
        this.is_it_edit = true
      },

      // Update the link.
      updateEditLink: function(link, id) {
        this.tableData.splice(this.getObjectIndex(this.tableData, id), 1);
        // only update the table if the category name is the selected one
        if (this.selectedItem === 'All Categories Links' || this.selectedItem === link.category_name) {
          this.tableData.push(link)
        }
        this.contextExists = this.arrayEmpty(this.tableData)
      },

      // Delete the link when called.
      deleteLink: function(id) {
        this.axios.delete(this.api.links + id + '/').then(response => {
          // Respond based on the response from backend server
          if (response.statusText === 'No Content' && response.status === 204) {
            this.emitMessage('Links Successfully Deleted', 'is-success')
            this.tableData.splice(this.getObjectIndex(this.tableData, id), 1);
            this.contextExists = this.arrayEmpty(this.tableData)
          } else {
            console.log(response)
            this.emitMessage('FAILURE: Link Deletion Unsuccessful, check browser console logfor more details ', 'is-danger')
          }
        }).catch(error => {
          console.log(error)
          console.log(error.response.data)
          this.emitMessage('FAILURE: Link Deletion Unsuccessful, check browser console log for more details', 'is-danger')
        })
      },

      // A new menu has been clicked.
      clickedContent: function(id) {
        // Pull the data from the category API
        this.axios.get(this.api.category + id + '/').then(response => {
          this.tableData = response.data.category
          this.selectedItem = response.data.name
          this.contextExists = this.arrayEmpty(this.tableData)
        })
      },

      // All content request
      allContent: function() {
        // All the links
        this.axios.get(this.api.links).then(response => {
          this.tableData = response.data
          this.selectedItem = 'All Categories Links'
          this.contextExists = this.arrayEmpty(this.tableData)
        })
      }

    }
  }
</script>

<style>
</style>
