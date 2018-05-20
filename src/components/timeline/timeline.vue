<template>
  <section class="section">
    <div class="columns">
      <!--Customers sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=false v-on:selectedOrg="loadTimeline"> </app-customer>
      </div>
      <!--All the environment tab-->
      <div class="column is-10">
        <section>
          <!--Card section-->
          <app-card v-if="!showDetails" :content.sync="timelines"
                    :orgID = orgID
                    :url="api.timeline"
                    :formFields="formFields"
                    :messages="messageContent"
                    @updateContent="updateTimeline($event)"
                    @delete = "confirmDelete($event, 'Timeline')"
                    @showDetails = "showDetail">
          </app-card>
          <!--Detail content page-->
          <app-page-contents v-else
                            :showDetails="showDetails"
                            :timeline = timeline
                            :categories = categories
                            @closeDetails="showDetails = false">
          </app-page-contents>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import contents from './contents'
  import card from '../card/card'
  export default {
    components: {
      'app-page-contents': contents,
      'app-card': card
    },
    data: function () {
      return {
        showDetails: false,
        orgID: '',
        timelines: [],
        timeline: {},
        categories: [],
        formFields: {         // form fields
          title: {
            formtype: 'input',
            label: 'Timeline Title',
            placeholder: "Enter Timeline Title...",
            validate: 'required|max:100',
            icon: 'far fa-file-word'
          },
          description: {
            formtype: 'textarea',
            label: 'Timeline Description',
            placeholder: "Enter a brief information about this timeline...",
            validate: 'required|max:300',
            rows: 4
          },
        }
      }
    },
    methods: {
      // have to use this, since the prop from child to child is not updating
      // and this workaround seems to work
      updateTimeline: function (event) {
        var timelineBackup = this.deepCopyObject(this.timelines)
        this.timelines = []
        this.timelines = this.updateElement(timelineBackup, event.id, event)
      },
      // When clicked show the detail of this timeline
      showDetail: function (id) {
        this.timeline = this.timelines[this.getObjectIndex(this.timelines, id)]
        this.showDetails = true
      },
      // Load timeline
      loadTimeline: function (event) {
        this.showDetails = false
        this.orgID = event.org_id
        this.get(this.api.timeline + '?org_id=' + this.orgID).then(response => {
          this.timelines = response
        }).catch(error => {
          this.errorParser(this.timelineLoadFailure, error)
        })
      },
      // delete data
      deleteData: function (id) {
        this.delete(this.api.timeline + id + '/').then(response => {
          this.removeElement(this.timelines, id)
          this.notice(this.timelineDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.timelineDeleteFailure, error)
        })
      }
    },
    computed: {
      messageContent: function () {
        return {
          title: "Timeline",
          buttonName: "New Timeline",
          noContent: this.noTimelineMessage,
          postSuccess: this.newTimelinePostSuccess,
          postFailure: this.newTimelinePostFailure,
          patchSuccess: this.timelineUpdateSuccess,
          patchFailure: this.timelineUpdateFailure,
        }
      }
    },
    created: function () {
      this.get(this.api.timelineCategory).then(response => {
        this.categories = response
      })
      return this.$store.dispatch('activeNavbarAction', 'Timeline')
    },
  }
</script>
