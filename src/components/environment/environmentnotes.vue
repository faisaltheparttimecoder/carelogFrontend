<template>
  <div>

    <nav class="level" v-if="!showDetails">
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item control has-icons-left has-icons-right" v-if="!addButtonActive">
          <input class="input" maxlength="50" type="text" placeholder="Note Title..." v-model="noteTitle">
          <span class="icon is-small is-left">
            <i class="fas fa-book"></i>
          </span>
        </div>
        <div class="level-item" v-if="!addButtonActive">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-outlined" v-on:click="saveTitle">
                <span class="icon is-small">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save</span>
              </a>
            </p>
          </div>
        </div>
        <div class="level-item" v-if="!addButtonActive">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-outlined" @click="addButtonActive = true">
                <span class="icon is-small">
                  <i class="fas fa-ban"></i>
                </span>
                <span>Cancel</span>
              </a>
            </p>
          </div>
        </div>
        <div class="field has-addons" v-if="addButtonActive">
          <p class="control">
            <a class="button" @click="addButtonActive = false">
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span>Add</span>
            </a>
          </p>
        </div>
      </div>
    </nav>
    <app-nocontent v-if="notes[0]['id'] === ''"
                   :message="'No environment notes found, Click on the Add button to add one.'">
    </app-nocontent>

    <div v-else>
      <div class="tile is-ancestor" v-for="notes in chunkNotes()" v-if='!showDetails'>
        <div class="tile is-parent" v-for="note in notes">
          <div class="tile is-child box">
            <p class="title">{{note.title}}</p>
            <p class="content">
              <app-markdown :source="snippet(note.info)"> </app-markdown>
              <a v-on:click="loadDetails(note.id, note.info, note.title)"> Read More ... </a>
            </p>
            <br/>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" v-on:click="loadDetails(note.id, note.info, note.title)">
                  <span class="icon is-small"><i class="fas fa-eye"></i></span>
                </a>
                <a class="level-item" v-on:click="confirmDelete(note.id)">
                  <span class="icon is-small"><i class="fas fa-trash"></i></span>
                </a>
              </div>
              <div class="level-right">
                <p class="heading"><strong> updated: </strong> {{ note.updated | moment("ddd, MMMM Do YYYY HH:MM:ss Z")
                  }} </p>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <app-details v-if='showDetails'
                   :markdownSwitches="markdownSwitches"
                   :noteDetails = "noteDetails"
                   v-on:updatedNotes="updatedNotes"
                   v-on:showDetails="showDetails = false"
                   v-on:previewNote="markdownSwitches.show = true"
                   v-on:editNote="markdownSwitches.show = false">
      </app-details>

    </div>


  </div>
</template>


<script>

  var qs = require('qs')
  var chunk = require('chunk')
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import details from './environmentnotesdetails'
  import noContent from './../core/nocontent'
  import options from './editor'
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      'app-markdown': VueMarkdown,
      'app-details': details,
      'app-nocontent': noContent
    },
    props: [
      'orgID', 'info'
    ],
    mixins: [
      defaults, helpers, options
    ],
    data: function () {
      return {
        addButtonActive: true,
        showDetails: false,
        noteTitle: '',
        subAPi: 'environment_notes',
        notes: [{id: ''}],
        noteDetails: {
          id: '',
          org_id: this.orgID,
          title: '',
          sub_api: 'environment_notes'
        }
      }
    },
    methods: {
      updatedNotes: function (note, id) {
        this.markdownSwitches.source = note.info
        this.markdownSwitches.originalSource = this.markdownSwitches.source
        this.markdownSwitches.show = true
        this.notes.splice(this.getObjectIndex(this.notes, id), 1);
        this.notes.push(note)
      },
      loadDetails: function (id, content, title) {
        this.markdownSwitches.source = content
        this.noteDetails = {
          id: id,
          org_id: this.orgID,
          title: title,
          sub_api: 'environment_notes'
        }
        this.showDetails = true
      },
      saveTitle: function () {
        this.axios.post(this.api.environment + this.subAPi + '/', qs.stringify({
          org_id: this.orgID,
          title: this.capitalizeFirstLetter(this.noteTitle)
        })).then(response => {
          if (this.notes[0]['id'] === '') {
            this.notes = [response.data]
          } else {
            this.notes.push(response.data)
          }
          this.addButtonActive = true
          this.noteTitle = ''
          this.emitMessage("Notes Successfully Created", 'is-success')
        }).catch(e => {
          console.log(e)
          console.log(e.response)
          this.emitMessage("Notes Creation Failed", 'is-danger')
        })
      },
      deleteNote: function (id) {
        this.axios.delete(this.api.environment + this.subAPi + '/' + id + '/').then(response => {
          this.notes.splice(this.getObjectIndex(this.notes, id), 1);
          if (this.notes.length === 0) {
            this.notes = [{id: ''}]
          }
          this.addButtonActive = true
          this.emitMessage("Notes Successfully Deleted", 'is-success')
        }).catch(e => {
          console.log(e)
          console.log(e.response)
          this.emitMessage("Notes Deletion Failed", 'is-danger')
        })
      },
      confirmDelete: function (id) {
        this.$dialog.confirm({
          title: 'Deleting Note',
          message: 'Are you sure you want to <b>delete</b> this environment note? This action cannot be undone.',
          confirmText: 'Delete Environment Note',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteNote(id)
        })
      },
      chunkNotes: function () {
        return chunk(this.notes, 2)
      },
      snippet: function (data) {
        return data.slice(0, 200) + '...'
      }
    },
    watch: {
      'info': function () {
        this.notes = this.info
      },
      'orgID': function () {
        this.showDetails = false
        this.markdownSwitches.show = true
      }
    }
  }

</script>
