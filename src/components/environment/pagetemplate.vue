<!--Template to obtain editing the environment infomation-->
<template>
  <section>
    <!--The Editor-->
    <app-editor :optionSwitch="switches"
                :fullWidth="true"
                :rows="100"
                :showButton="showButton"
                :source="sourceData.info"
                :templateData="templateData"
                v-on:saveEdit="confirmSave($event, 'Page')">
      <p class="heading" slot="slot-data">
        <strong>Last Updated:</strong> {{ this.formatDate(sourceData.updated, true) }}
      </p>
    </app-editor>
    <!--If there is no content, then print this message-->
    <app-no-contents :message="noEnvContentMessage"
                     v-if="sourceData.info===''">
    </app-no-contents>
  </section>
</template>

<script>
  import editor from './../core/editor/editor'
  export default {
    components: {
      'app-editor': editor
    },
    props: [
      'templateData', 'url', 'orgID'
    ],
    data: function () {
      return {
        showButton: true,
        sourceData: {
          id: '',
          updated: '',
          org_id: this.orgID,
          info: ''
        },
        switches: {
          save: false,
          edit: true,
          preview: false,
          template: false,
          clear: false,
          cancel: false,
        },
      }
    },
    methods: {
      // Get the data based on the organization change
      orgChangedGetData: function() {
        // Reset the data first
        this.sourceData = {id: '', org_id: this.orgID, updated: '', info: ''}
        // Get the data from the database
        this.get(this.url + '?org_id=' + this.orgID ).then(response => {
          if (!this.arrayEmpty(response)) { this.sourceData = response[0] }
        }).catch(error => {
          this.errorParser(this.environmentLoadFailure, error)
        })
      },
      // Save the data
      saveData: function (data) {
        this.sourceData.info = data // Update the data
        if (this.sourceData.id === '') { // Post request
          this.post(this.url, this.sourceData).then(response => {
            this.sourceData = response
            this.notice(this.environmentPostSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.environmentPostFailure, error)
          })
        } else { // put request
          this.patch(this.url + this.sourceData.id + '/', this.sourceData).then(response => {
            this.sourceData = response
            this.notice(this.environmentPutSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.environmentPutFailure, error)
          })
        }
      }
    },
    watch: { // watch the info property and change the value based on the changes.
      'orgID': function () {
        this.orgChangedGetData()
      }
    }
  }
</script>
