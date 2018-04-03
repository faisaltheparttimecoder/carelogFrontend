<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"> {{ modalProp.modalTitle }}</p>
      </header>

      <section class="modal-card-body">

        <div class="field">
          <label class="label">Choose Category</label>
          <div class="control">
            <div class="select">
              <select v-model="modalProp.linkCategory" placeholder="Select Category" required>
                <option v-for="category in categories" :value="category.name">{{ category.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Link Name</label>
          <div class="control">
            <input class="input" type="text" maxlength="100" v-model="modalProp.linkName"
                   placeholder="Enter the link name" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Link URL</label>
          <div class="control">
            <input class="input" type="url" maxlength="500" v-model="modalProp.linkUrl" placeholder="Enter the link URL"
                   required>
          </div>
        </div>

        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" v-model="modalProp.linkInfo"
                      placeholder="Enter some information about this Link ..." maxlength="500" required></textarea>
          </div>
        </div>

      </section>

      <footer class="modal-card-foot">
        <button class="button is-success is-outlined" @click.prevent="addNewLink">Add</button>
        <button class="button is-danger is-outlined" type="button" @click="$parent.close()">Close</button>
      </footer>
    </div>
  </form>
</template>

<script>
  // This plugin is used to convert the data that can be read by Django Backend.
  var qs = require('qs')

  import helpers from './../../mixins/helper'
  import defaults from './../../mixins/default'

  export default {
    // Props that is send via the root component
    props: [
      'modalProp', 'categories', 'is_it_edit'
    ],
    // All mixins
    mixins: [
      helpers, defaults
    ],
    methods: {
      // Adding a new link
      addNewLink: function () {
        // Check if all the fields are selected
        if (this.emptyData(this.modalProp.linkName) || this.emptyData(this.modalProp.linkUrl) || this.emptyData(this.modalProp.linkInfo)) {
          this.emitMessage("Failure: All the fields are required", 'is-danger')
          return false
        }
        // Get the category ID before sending the post or put
        var category_id = this.getValueOfKey(this.categories, this.modalProp.linkCategory)
        if (category_id === '') {
          this.emitMessage('FAILURE: Cannot find the corresponding category Id for the category: ' + this.modalProp.linkCategory, 'is-danger')
          return false
        }
        // Is this a edit link call
        if (this.is_it_edit) {
          // Send a put request to update the link
          this.axios.put(this.api.links + this.modalProp.linkId + '/', qs.stringify({
            'name': this.capitalizeFirstLetter(this.modalProp.linkName),
            'url': this.modalProp.linkUrl,
            'info': this.modalProp.linkInfo,
            'category_id': category_id
          })).then(response => {
            // Respond based on the response from backend server
            if (response.statusText === 'OK' && response.status === 200) {
              this.$parent.close()
              this.emitMessage('Links Successfully Updated', 'is-success')
              return this.$emit('updateLink', response.data, this.modalProp.linkId)
            } else {
              console.log(response)
              this.emitMessage('FAILURE: Link Update Unsuccessful, check browser console log', 'is-danger')
            }
          }).catch(error => {
            // Return any error if any.
            console.log(error)
            console.log(error.response.data)
            this.emitMessage('Failure: Check the browser console log for more information', 'is-danger')
          })
        } else {
          // Send a post request to create the link
          this.axios.post(this.api.links, qs.stringify({
            'name': this.capitalizeFirstLetter(this.modalProp.linkName),
            'url': this.modalProp.linkUrl,
            'info': this.modalProp.linkInfo,
            'category_id': category_id
          })).then(response => {
            // Respond based on the response from backend server
            if (response.statusText === 'Created' && response.status === 201) {
              this.$parent.close()
              this.emitMessage('Links Successfully Registered', 'is-success')
              return this.$emit('newLink', response.data)
            } else {
              console.log(response)
              this.emitMessage('FAILURE: Link Registration Unsuccessful, check browser console log', 'is-danger')
            }
          }).catch(error => {
            // Return any error if any.
            console.log(error)
            console.log(error.response.data)
            this.emitMessage('Failure: Check the browser console log for more information', 'is-danger')
          })
        }
      }
    }
  }
</script>

<style>
</style>
