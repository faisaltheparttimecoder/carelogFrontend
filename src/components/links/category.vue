<!--Components to add and modify the category name-->
<template>
  <div>
    <div class="field">
      <p class="control">
        <a class="button is-outlined" v-on:click="newCategory">
          <span class="icon is-small">
            <i class="fas fa-tags"></i>
          </span>
          <span>New Category</span>
        </a>
      </p>
    </div>
    <!--Modal to add and edit team members-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal :title="modalTitle">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Category')">
        </app-form>
      </app-modal>
    </b-modal>
  </div>
</template>

<script>
  import form from './../core/form/generator'
  import modal from './../core/skeletons/modal'
  export default {
    components: {
      'app-form': form,
      'app-modal': modal,
    },
    props: [
      'updateCategory'
    ],
    data: function () {
      return {
        showModal: false,
        modalTitle: 'Category',
        formData: {},           // placeholder for data
        formFields: {           // Form Category form fields
          name: {
            formtype: 'input',
            label: 'Category',
            placeholder: "Enter Category Name...",
            validate: 'required|alpha_spaces|max:100',
            icon: 'fas fa-tags'
          },
        },
      }
    },
    methods: {
      newCategory: function () { // Reset the value when the add button is clicked
        this.formData = {
          id: '',
          name: ''
        }
        this.showModal = true
      },
      saveData: function (event) {  // Save the data
        if (event.id === '') { // New category
          this.post(this.api.category, {
            'name': this.capitalizeFirstLetter(event.name)
          }).then(response => {
            this.notice(this.categorySaveSuccess, 'success', 'success')
            this.$emit('new', response)
            this.showModal = false
          }).catch(error => {
            this.errorParser(this.categorySaveFailure, error)
          })
        } else { // Update of the category
          this.patch(this.api.category + event.id + '/', {
            'name': this.capitalizeFirstLetter(event.name)
          }).then(response => {
            this.notice(this.categoryUpdateSuccess, 'success', 'success')
            this.$emit('update', response)
            this.showModal = false
          }).catch(error => {
            this.errorParser(this.categoryUpdateFailure, error)
          })
        }
      }
    },
    watch: {  // Watch for the category that the user wants to update
      'updateCategory': function () {
        this.formData = this.updateCategory
        this.showModal = true
      }
    }
  }
</script>
