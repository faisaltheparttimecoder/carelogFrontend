<!--All the contents for the links-->
<template>
  <section>
    <!--Filter bar-->
    <app-filter-bar :title="emptyData(categoryTitle) ? selectedItem: categoryTitle"
                    :search.sync="search"
                    :showButton = "true"
                    buttonName = "New Link"
                    v-on:add="formData = {id: '', category_id: 0}; showModal = true">
    </app-filter-bar>
    <!--Modal to add and edit links-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal :title="modalTitle">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Category')">
        </app-form>
      </app-modal>
    </b-modal>
    <!--Show no content message if there is no link associated with this category-->
    <app-no-contents v-if="arrayEmpty(allLinks) && arrayEmpty(tableData)"
                     :message="linkNoContentMessage">
    </app-no-contents>
    <!--Table section-->
    <div v-else class="columns" >
      <app-table v-for="index in [0, 1, 2]"
                 :key=index
                 :data="arraySlicer(
                        filter(arrayEmpty(allLinks) ? tableData : allLinks, 'name', search, 'info'),
                        index
                       )"
                 @editLink="formData = $event; showModal = true"
                 @deleteLink="confirmDelete($event, 'Link')">
      </app-table>
    </div>
  </section>
</template>

<script>
  import table from './table'
  import filterbar from './../core/skeletons/filterbar'
  export default {
    props: [
      'categoryID', 'tableData', 'selectedItem', 'categories'
    ],
    components: {
      'app-table': table,
      'app-filter-bar': filterbar
    },
    data: function() {
      return {
        allLinks: [],         // Placeholder for all the link
        showModal: false,     // Bool to turn on or off the modal
        search: '',           // Search criteria placeholder
        categoryTitle: '',    // Clicked Category Title
        modalTitle: 'Links',    // Modal Title
        formData: {category_id: 0}, // Placeholder to store all the form fields
        formFields: {         // Add / Update link form fields
          category_id: {
            formtype: 'select',
            label: 'Category',
            placeholder: "Select Category...",
            validate: 'required|not_in:0',
            icon: 'fas fa-tags',
            options: []
          },
          name: {
            formtype: 'input',
            label: 'Link Name',
            placeholder: "Enter Link Name...",
            validate: 'required|alpha_spaces|max:100',
            icon: 'fas fa-link'
          },
          url: {
            formtype: 'input',
            label: 'Link URL',
            placeholder: "Enter Link URL...",
            validate: 'required|url|max:500',
            icon: 'fas fa-external-link-alt'
          },
          info: {
            formtype: 'textarea',
            label: 'Link Information',
            placeholder: "Enter a brief information about this link...",
            validate: 'required|max:500',
            rows: 4
          },
        }
      }
    },
    methods: {
      // All content request
      allContent: function () {
        this.get(this.api.links).then(response => {
          this.allLinks = response
          this.categoryTitle = 'All Categories'
        }).catch(error => {
          this.errorParser(this.selectedLinkLoadFailure, error)
        })
      },
      // Post a the new element in the array
      newElementInArray: function (newElement) {
        if (this.categoryID === newElement.category_id) {
          this.$emit('new', newElement)
        } else if (this.categoryID === 'all') {
          this.allLinks.push(newElement)
        }
      },
      updateElementInArray: function (updateElement) {
        if (this.categoryID === updateElement.category_id) { // Update the category view if the view is of that category
          this.$emit('update', updateElement)
        } else if (this.categoryID === 'all') { // If this all category view, then update it
          this.allLinks = this.updateElement(this.allLinks, updateElement.id, updateElement)
        } else { // If the user changed the category type and the view is of different category, then remove it
          this.$emit('update.patch', this.removeElement(this.tableData, updateElement.id))
        }
      },
      // remove element from the array
      removeElementFromArray: function (id) {
        if (this.categoryID === 'all') {
          this.removeElement(this.allLinks, id)
        } else {
          this.$emit('delete', id)
        }
      },
      // Save the data
      saveData: function () {
        this.formData.name = this.capitalizeFirstLetter(this.formData.name)
        if (this.formData.id === '') { // New link request
          this.post(this.api.links, this.formData).then(response => {
            this.notice(this.linkAddSuccess, 'success', 'success')
            this.showModal = false
            this.newElementInArray(response)
          }).catch(error => {
            this.errorParser(this.linkAddFailure, error)
          })
        } else { // update the link
          this.patch(this.api.links + this.formData.id + '/', this.formData).then(response => {
            this.notice(this.linkUpdateSuccess, 'success', 'success')
            this.showModal = false
            this.updateElementInArray(response)
          }).catch(error => {
            this.errorParser(this.linkUpdateFailure, error)
          })
        }
      },
      // delete the link if requested
      deleteData: function (event) {
        this.delete(this.api.links + event + '/').then(response => {
          this.notice(this.linkDeleteSuccess, 'success', 'success')
          this.removeElementFromArray(event)
        }).catch(error => {
          this.errorParser(this.linkDeleteFailure, error)
        })
      }
    },
    watch: {
      // Watch for the changed in the categoryID values and then alter the view
      // of the page.
      'categoryID': function () {
        this.formFields.category_id.options = this.categories
        if (this.categoryID === 'all') {
          this.allContent()
        } else {
          this.allLinks = []
          this.categoryTitle = ''
        }
      }
    }
  }
</script>
