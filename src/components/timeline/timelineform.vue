<template>

  <section>
    <h1 class="title"> Add new activity </h1>

    <div class="field">
      <label class="label"> Activity Title </label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Enter Title ..." v-model="form.title" maxlength="100" required>
        <span class="icon is-small is-left">
        <i class="fas fa-font"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Select Date</label>
      <div class="control has-icons-left has-icons-right">
        <b-datepicker
          v-model="form.date"
          placeholder="Type or select a date..."
          icon="calendar-today"
          :readonly="false"
          :max-date="maxDate" required>
        </b-datepicker>
      </div>
    </div>

    <div class="field">
      <label class="label">Select Category</label>
      <div class="control has-icons-left has-icons-right">
        <b-select
          v-model="form.category"
          placeholder="Pick Category"
          icon="map-marker"
          icon-pack="fas" expanded required>
          <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </b-select>
      </div>
    </div>

    <div class="field">
      <label class="label">Message</label>
      <div class="control">
        <textarea class="textarea" placeholder="Enter the timeline details..." v-model="form.message" maxlength="600"
                  required></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success is-outlined" v-on:click="addTimeline">Submit</button>
      </div>
      <div class="control">
        <button class="button is-info is-outlined" v-on:click="clearForm">Clear</button>
      </div>
    </div>
  </section>

</template>

<script>
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'

  var qs = require('qs')
  export default {
    mixins: [
      defaults, helpers
    ],
    props: [
      'timeline', 'orgID', 'form'
    ],
    data: function () {
      const today = new Date()
      return {
        maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        categories: [],
      }
    },
    methods: {
      addTimeline: function () {
        if (this.emptyData(this.form.title) || this.emptyData(this.form.message) || this.form.category === undefined) {
          this.emitMessage("All Fields are mandatory", "is-danger")
          return false
        }
        if (this.form.update) {
          this.axios.put(this.api.timelineDetails + this.form.id + '/', qs.stringify({
            timeline_id: this.timeline,
            org_id: this.orgID,
            category_id: this.form.category,
            created: this.form.date,
            title: this.capitalizeFirstLetter(this.form.title),
            description: this.form.message
          })).then(response => {
            this.emitMessage('Successfully update the note to the timeline', 'is-success')
            this.$emit('newTimelineData')
          }).catch(error => {
            console.log(error)
            console.log(error.response)
            this.emitMessage('ERROR: Failure update the note to the timeline, check browser console log ', 'is-danger')
          })
        } else {
          this.axios.post(this.api.timelineDetails, qs.stringify({
            timeline_id: this.timeline,
            org_id: this.orgID,
            category_id: this.form.category,
            created: this.form.date,
            title: this.form.title,
            description: this.form.message
          })).then(response => {
            this.emitMessage('Successfully added a new note to the timeline', 'is-success')
            this.$emit('newTimelineData')
          }).catch(error => {
            console.log(error)
            console.log(error.response)
            this.emitMessage('ERROR: Failure to add note to the timeline, check browser console log ', 'is-danger')
          })
        }

      },
      clearForm: function () {
        return this.$emit('clearForm')
      }
    },
    created: function () {
      this.axios.get(this.api.timelineCategory).then(response => {
        this.categories = response.data
        return this.$emit('populateCategory', this.categories)
      })
    }
  }

</script>

<style>

</style>
