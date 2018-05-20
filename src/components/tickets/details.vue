<template>
  <section>
    <!--Floating button to close the page-->
    <app-floating-button @closeDetails="$emit('closeDetails')"> </app-floating-button>
    <!--Ticket Metrics-->
    <app-status-bar :status="ticketMetrics"> </app-status-bar>
    <!--Ticket comments-->
    <div class="columns">
      <div class="column is-8">
        <div v-for="comment in comments" class="box" :class="{'internal-comment': !comment.public}">
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img :src="getUserPhoto(comment.author_id)" alt="Image">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong v-html="zdUsers['zd' + comment.author_id].name"></strong>
                  <small>{{ formatDate(comment.created_at, true) }}</small>
                  <br>
                  <span v-html="comment.html_body"></span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <!--Ticket Notes-->
      <div class="column is-4">
        <article v-for="(ticketNote, index) in ticketNotes" class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ ticketNote.author }}</strong>
                <br> {{ ticketNote.notes }} <br>
                <small>
                  <a v-on:click="confirmDelete(ticketNote.id, 'Ticket Notes')">Delete</a>·
                  {{ formatDate(ticketNote.created, true) }}
                </small>
              </p>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <app-form :formFields="formFields"
                      :formData.sync="formData"
                      v-on:saveData="confirmSave($event, 'Ticket Notes')">
            </app-form>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
  import statusBar from './../core/skeletons/statusbar'
  import floatingButton from './../core/skeletons/floatingbutton'
  export default {
    components: {
      'app-status-bar': statusBar,
      'app-floating-button': floatingButton
    },
    props: [
      'ticket', 'orgID'
    ],
    data: function() {
      return {
        formData: {notes: ''},
        comments: [],
        zdUsers: [],
        ticketNotes: [],
        ticketMetrics: {
          'Ticket': '<a href="https://discuss.zendesk.com/agent/tickets/'+ this.ticket + '">' + this.ticket + '</a>',
          'Replies': '',
          'Created': '',
          'Last Comment': '',
        },
        formFields: {
          'notes': {
            formtype: 'textarea',
            label: 'Add Notes',
            placeholder: "Enter a brief information about this link...",
            validate: 'required|max:500',
            rows: 7
          }
        },
      }
    },
    methods: {
      getUserPhoto: function (author) {
        if (this.zdUsers['zd' + author].photo !== null) {
          return this.zdUsers['zd' + author].photo.content_url
        } else {
          return "https://bulma.io/images/placeholders/128x128.png"
        }
      },
      saveData: function () {
        this.post(this.api.ticketNotes + '/', {
          ticket_id: this.ticket,
          org_id: this.orgID,
          author: this.$store.state.loggedUser,
          notes: this.formData.notes
        }).then(response => {
          this.ticketNotes.push(response)
          this.formData = {notes: ''}
          this.notice(this.ticketNotesSaveSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.ticketNotesSaveFailure, error)
        })
      },
      deleteData: function (id, index) {
        this.delete(this.api.ticketNotes + '/' + id + '/').then(response => {
          this.removeElement(this.ticketNotes, id)
          this.notice(this.ticketNotesDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.ticketNotesDeleteFailure, error)
        })
      }
    },
    created: function () {
      this.toggleLoading(true)
      // Pull all the comments
      this.get(this.api.ticketComments + this.ticket + '/').then(response => {
        this.comments = response.comments
        for (let element of response.users) {
          this.zdUsers['zd' + element.id] = {
            name: element.name,
            photo: element.photo
          }
        }
        this.toggleLoading(false)
      }).catch(error => {
        this.errorParser(this.ticketCommentLoadFailure, error)
      })
      // Pull all the notes for this ticket
      this.get(this.api.ticketNotes + '?ticket_id=' + this.ticket + '&org_id=' + this.orgID).then(response => {
        this.ticketNotes = response
      }).catch(error => {
        this.errorParser(this.ticketNotesLoadFailure, error)
      })
      // Pull all the ticket metrics
      this.get(this.api.ticketMetrics + this.ticket + '/').then(response => {
        this.ticketMetrics.Replies = response.ticket_metric.replies
        this.ticketMetrics.Created = this.formatDate(response.ticket_metric.created_at, false)
        this.ticketMetrics['Last Comment'] = this.formatDate(response.ticket_metric.latest_comment_added_at, false)
      }).catch(error => {
        this.errorParser(this.ticketMetricsLoadFailure, error)
      })
    }
  }
</script>

<style scoped>
  .internal-comment {
    background-color: lightyellow;
  }
</style>
