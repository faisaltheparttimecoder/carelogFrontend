<template>
  <div>

    <!--New category button-->
    <div v-if="!menuFormActive" class="field">
      <p class="control">
        <a class="button is-success is-outlined" v-on:click="activateForm">
          <span class="icon is-small">
            <i class="fas fa-plus-square"></i>
          </span>
          <span>New Category</span>
        </a>
      </p>
    </div>

    <!--Form to create the category-->
    <div v-if="menuFormActive">
      <form>
        <b-field>
          <b-input v-model="categoryName" placeholder="Add a new category..." required></b-input>
        </b-field>
        <a class="button is-success is-outlined" v-on:click="addCategory()"> Add </a>
        <a class="button is-danger is-outlined" v-on:click="menuFormActive = false"> Cancel </a>
      </form>
    </div>

  </div>
</template>

<script>
  // This plugin is used to convert the data that can be read by Django Backend.
  var qs = require('qs')

  import helper from './../../mixins/helper'
  import defaults from './../../mixins/default'

  export default {
    // All mixins
    mixins: [
      helper, defaults
    ],

    // Default values for this component
    data: function () {
      return {
        categoryName: '',
      }
    },

    methods: {

      // reset the form and activate the form
      activateForm: function() {
        this.menuFormActive = true
        this.categoryName = ''
      },

      // Add new category method
      addCategory: function() {

        // Emit error if the field is blank
        if (this.emptyData(this.categoryName)) {
          this.emitMessage("ERROR: Missing data for the category name", 'is-danger')
          return false
        }

        // if all good lets post it
        this.axios.post(this.api.category, qs.stringify({
          'name': this.categoryName.toLowerCase(),
        })).then(response => {
          if (response.statusText === 'Created' && response.status === 201) {
            this.menuFormActive = false
            this.emitMessage('Category Successfully Registered', 'is-success')
            return this.$emit('updatedMenuItem', response.data)
          } else {
            console.log(response)
            this.emitMessage('FAILURE: Category Registration Unsuccessful, check browser console log', 'is-danger')
          }
        }).catch(error => {
          console.log(error)
          console.log(error.response.data)
          this.emitMessage("Failure: Check the browser console log for more information", 'is-danger')
        })

      }

    }
  }
</script>

<style>

</style>
