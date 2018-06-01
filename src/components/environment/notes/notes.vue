<template>
  <section>
    <!--Card to show up the contents-->
    <app-card v-if="!showDetail"
              :content.sync="notes"
              :orgID = orgID
              :url="api.environment + 'environment_notes/'"
              :formFields="formFields"
              :messages="messageContent"
              @showDetails = "showDetails"
              @updateContent="updateNotes($event)"
              @delete = "confirmDelete($event, 'Notes')">
    </app-card>
    <!--Detail content page-->
    <app-page-details v-else
                      :note="note"
                      :showDetail="showDetail"
                      @closeDetails="closeDetailPage(); updateNotes($event)">
    </app-page-details>
  </section>
</template>

<script>
  import details from './details'
  import card from '../../core/card/card'
  export default {
    components: {
      'app-page-details': details,
      'app-card': card
    },
    props: [
      'orgID'
    ],
    data: function () {
      return {
        showModal: false,
        showDetail: false,
        search: '',
        notes: [],
        note: {},
        formFields: {         // form fields
          title: {
            formtype: 'input',
            label: 'Note Title',
            placeholder: "Enter Note Title...",
            validate: 'required|max:50',
            icon: 'far fa-sticky-note'
          },
        },
      }
    },
    methods: {
      // have to use this, since the prop from child to child is not updating
      // and this workaround seems to work
      updateNotes: function (event) {
        var notesBackup = this.deepCopyObject(this.notes)
        this.notes = []
        this.notes = this.updateElement(notesBackup, event.id, event)
      },
      // Close Detail page
      closeDetailPage: function () {
        this.showDetail = false
        this.note = {}
      },
      // Show Detail Page
      showDetails: function (id) {
        this.note = this.notes[this.getObjectIndex(this.notes, id)]
        this.showDetail = true
      },
      // delete the note
      deleteData: function (event) {
        this.delete(this.api.environment + 'environment_notes/' + event + '/').then(response => {
          this.removeElement(this.notes, event)
          this.notice(this.notesDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.notesDeleteFailure, error)
        })
      }
    },
    computed: {
      messageContent: function () {
        return {
          title: "Environment Notes",
          buttonName: "New Notes",
          noContent: this.noNotesMessage,
          postSuccess: this.notesPostSuccess,
          postFailure: this.notesPostFailure,
          patchSuccess: this.notesUpdateSuccess,
          patchFailure: this.notesUpdateFailure,
        }
      }
    },
    watch: {
      'orgID': function () {
        this.closeDetailPage()
        this.get(this.api.environment + 'environment_notes/?org_id=' + this.orgID ).then(response => {
          this.notes = response
        }).catch(error => {
          this.errorParser(this.notesLoadFailure, error)
        })
      }
    }
  }
</script>
