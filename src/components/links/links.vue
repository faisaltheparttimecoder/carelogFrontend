<!--Main link components with which the page is built-->
<template>
  <section class="section">
    <div class="columns">
      <!--Menu SideBar-->
      <div class="column is-2">
        <app-menu :menu-items="menuItems"
                  :selectedItem='selectedItem'
                  menuTitle="Categories"
                  :sourceInfo=false
                  :allActive=true
                  :menuModification="true"
                  v-on:refreshContent="clickedContent($event)"
                  v-on:allContent="categoryID = 'all'; selectedItem= 'All'"
                  v-on:updateItem="updateItem"
                  v-on:deleteItem="confirmDelete($event, 'Category')">
          <!--Extra contents for the menu-->
          <div slot="menuTop">
            <!--Button to add new category-->
            <p class="menu-label has-text-primary has-text-weight-bold">
              Action
            </p>
            <app-category @new="menuItems.push($event)"
                          @update="updateMenuItem"
                          :updateCategory="updateCategory">
            </app-category>
          </div>
        </app-menu>
      </div>
      <!--All the links from the selected category-->
      <div class="column is-10">
        <app-content :categoryID="categoryID"
                     :tableData="tableData"
                     @new="tableData.push($event)"
                     @update="tableData = updateElement(tableData, $event.id, $event)"
                     @delete="removeElement(tableData, $event)"
                     :categories="menuItems"
                     :selectedItem="selectedItem">
        </app-content>
      </div>
    </div>
  </section>
</template>

<script>
  import category from './category'
  import content from './content'
  export default {
    name: 'links',
    components: {
      'app-category': category,
      'app-content': content
    },
    data: function () {
      return {
        noContentMessage: 'This category don\'t have any URL, add one using the register new link button',
        menuItems: [],
        selectedItem: '',
        tableData: [],
        categoryID: '',
        updateCategory: {id: '', name: ''},
      }
    },
    methods: {
      // Delete the category from the list.
      deleteData: function (id) {
        this.delete(this.api.category + id + '/').then(response => {
          this.removeElement(this.menuItems, id)
          this.notice(this.categoryDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.categoryDeleteFailure, error)
        })
      },
      // When clicked on the update button, record the information
      // of the clicked category and pass it on to the form.
      updateItem: function (event) {
        this.updateCategory = event
      },
      // Update Menu based on changes to the category name
      updateMenuItem: function (event) {
        this.menuItems = this.updateElement(this.menuItems, event.id, event)
        this.selectedItem = event.name
        this.categoryID = event.id
      },
      // pull the menu item based on load or delete
      getMenuItem: function () {
        var item = this.pickMenuItem(this.menuItems)
        if (item === '') {
          this.tableData = []
        } else {
          this.clickedContent(item)
        }
      },
      // A new menu has been clicked.
      clickedContent: function (id) {
        // Pull the data from the category API
        this.get(this.api.category + id + '/').then(response => {
          this.tableData = response.category
          this.selectedItem = response.name
          this.categoryID = response.id
        }).catch(error => {
          this.errorParser(this.selectedCategoryLoadFailure, error)
        })
      },
    },
    // Attaching the lifecycle hook, to pull the API.
    created: function () {
      this.get(this.api.category).then(response => {    // All the categories
        this.menuItems = response
        this.selectedItem = 'All'
        this.categoryID = 'all'
      }).catch(error => {
        this.errorParser(this.categoryLoadFailure, error)
      })
      this.$store.dispatch('activeNavbarAction', 'Links')
    },
  }
</script>

<style>
</style>
