<!--Form page for timeline-->
<template>
  <div class="box">
    <h1 class="title"> {{ formData.id === '' ? 'Add' : 'Update' }} Timeline Content</h1>
    <app-form :formFields="formFields"
              slot="modal-body"
              :formData.sync="formData"
              v-on:saveData="confirmSave($event, 'Timeline Content')">
    </app-form>
  </div>
</template>
<script>
  export default {
    props: [
      'categories', 'timeline', 'updateTimelineContent'
    ],
    data: function () {
      const today = new Date()
      return {
        formData: {id: '', category_id: 0},
        formFields: {         // form fields
          title: {
            formtype: 'input',
            label: 'Title',
            placeholder: "Enter Title ...",
            validate: 'required|max:100',
            icon: 'far fa-sticky-note'
          },
          created: {
            formtype: 'date',
            label: 'Date',
            maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            placeholder: "Enter Date...",
            validate: 'required',
            icon: 'far fa-sticky-note'
          },
          category_id: {
            formtype: 'select',
            label: 'Category',
            placeholder: "Select Category...",
            validate: 'required|not_in:0',
            icon: 'fas fa-map-marker',
            options: this.categories
          },
          description: {
            formtype: 'textarea',
            label: 'Message',
            placeholder: "Enter the timeline details......",
            validate: 'required|max:9500',
            rows: 12
          },
        },
      }
    },
    methods: {
      // Save the data
      saveData: function (event) {
        var data = event
        data.title = this.capitalizeFirstLetter(data.title)
        data.timeline_id = this.timeline.id
        data.org_id = this.timeline.org_id
        if (data.id === '') { // POST request
          this.post(this.api.timelineDetails, data).then(response => {
            this.$emit('modified')
            this.formData = {id: '', category_id: 0}
            this.notice(this.timelineDataPostSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.timelineDataPostFailure, error)
          })
        } else { // PUT
          this.patch(this.api.timelineDetails + event.id + '/', data).then(response => {
            this.$emit('modified')
            this.formData = {id: '', category_id: 0}
            this.notice(this.timelineDataUpdateSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.timelineDataUpdateFailure, error)
          })
        }
      }
    },
    watch:  {
      // Watch for the update changes and update the form field
      'updateTimelineContent': function () {
        this.formData = this.updateTimelineContent
      }
    }
  }
</script>
