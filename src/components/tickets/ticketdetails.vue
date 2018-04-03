<template>
  <section>
    <!--Loading page-->
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :canCancel="true"></b-loading>

    <!--Floating button to close the page-->
    <a v-on:click="closeDetails" class="float">
      <i class="fas fa-times my-float"></i>
    </a>

    <!--Ticket Metrics-->
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Ticket</p>
          <p class="title"><a :href="'https://discuss.zendesk.com/agent/tickets/'+ticket">{{ ticket }}</a></p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Replies</p>
          <p class="title">{{ ticketMetrics.replies }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Created</p>
          <p class="title">{{ ticketMetrics.created_at | moment('ddd, DD MMM YYYY') }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Last Comment</p>
          <p class="title">{{ ticketMetrics.latest_comment_added_at | moment('ddd, DD MMM YYYY') }}</p>
        </div>
      </div>
    </nav>

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
                  <strong v-html="getUserName(comment.author_id)"></strong>
                  <small>{{ comment.created_at | moment('ddd, DD MMM YYYY') }}</small>
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
        <h1 class="title"> Ticket Notes </h1>
        <article v-for="(ticketNote, index) in ticketNotes" class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ ticketNote.author }}</strong>
                <br>
                {{ ticketNote.notes }}
                <br>
                <small><a v-on:click="confirmDelete(ticketNote.id, index)">Delete</a>· {{ ticketNote.created |
                  moment("Do, MMM YYYY") }}
                </small>
              </p>
            </div>
          </div>
        </article>
        <article class="media">
          <div class="media-content">
            <div class="field">
              <p class="control">
                <b-input v-model="newNotes" type="textarea" placeholder="Add a note..." maxlength="500"></b-input>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-success is-outlined" v-on:click="postNotes">Add Note</button>
              </p>
            </div>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<script>
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import BInput from "buefy/src/components/input/Input";

  var qs = require('qs')
  export default {
    components: {BInput},
    props: [
      'ticket', 'orgID'
    ],
    mixins: [
      defaults, helpers
    ],
    methods: {
      closeDetails: function () {
        return this.$emit('closeDetails')
      },
      getUserName: function (author) {
        return this.zdUsers['zd' + author].name
      },
      getUserPhoto: function (author) {
        if (this.zdUsers['zd' + author].photo !== null) {
          return this.zdUsers['zd' + author].photo.content_url
        } else {
          return "https://bulma.io/images/placeholders/128x128.png"
        }
      },
      postNotes: function () {
        if (this.emptyData(this.newNotes)) {
          this.emitMessage("ERROR: Ticket notes cannot be blank", "is-danger")
          return false
        }
        this.axios.post(this.api.ticketNotes + '/', qs.stringify({
          ticket_id: this.ticket,
          org_id: this.orgID,
          author: this.$store.state.loggedUser,
          notes: this.newNotes
        })).then(response => {
          this.ticketNotes.push(response.data)
          this.newNotes = ''
          this.emitMessage("Ticket Notes Successfully Saved", 'is-success')
        }).catch(error => {
          console.log(error)
          console.log(error.response)
          this.emitMessage("Failure: Save failure Check browser console log for more information", 'is-danger')
        })
      },
      // Delete confirmation
      confirmDelete(id, index) {
        this.$dialog.confirm({
          title: 'Deleting Note',
          message: 'Are you sure you want to <b>delete</b> this note? <b>Please NOTE:</b> This action cannot be undone.',
          confirmText: 'Delete Note',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteNote(id, index)
        })
      },
      deleteNote: function (id, index) {
        this.axios.delete(this.api.ticketNotes + '/' + id + '/').then(response => {
          this.ticketNotes.splice(index, 1)
          this.emitMessage("Ticket Notes Successfully Deleted", 'is-success')
        }).catch(error => {
          console.log(error)
          console.log(error.response)
          this.emitMessage("Failure: Delete failure Check browser console log for more information", 'is-danger')
        })
      }
    },
    data: function () {
      return {
        isLoading: false,
        isFullPage: true,
        newNotes: '',
        comments: [],
        zdUsers: [],
        ticketNotes: [],
        ticketMetrics: {}
      }
    },
    created: function () {
      // Show loading scree
      this.isLoading = true
      // Pull all the comments
      this.axios.get(this.api.ticketComments + this.ticket + '/').then(response => {
        this.comments = response.data.comments
        for (let element of response.data.users) {
          this.zdUsers['zd' + element.id] = {
            name: element.name,
            photo: element.photo
          }
        }
        this.isLoading = false
      })
      // Pull all the notes for this ticket
      this.axios.get(this.api.ticketNotes + '?ticket_id=' + this.ticket + '&org_id=' + this.orgID).then(response => {
        this.ticketNotes = response.data
      })
      // Pull all the ticket metrics
      this.axios.get(this.api.ticketMetrics + this.ticket + '/').then(response => {
        this.ticketMetrics = response.data.ticket_metric
      })

    }
  }
</script>

<style scoped>
  .float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: red;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
    z-index: 999;
  }

  .my-float {
    margin-top: 22px;
  }

  .internal-comment {
    background-color: lightyellow;
  }

</style>
