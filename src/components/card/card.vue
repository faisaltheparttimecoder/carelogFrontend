<template>
  <div>
    <!--Filter bar-->
    <app-filter-bar :title="messages.title"
                    :buttonName="messages.buttonName"
                    :search.sync="search"
                    showButton = "true"
                    v-on:add="formData = {id: ''}; showModal = true">
    </app-filter-bar>
    <!--Modal to add and edit notes-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal :title="messages.title">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Note Title')">
        </app-form>
      </app-modal>
    </b-modal>
    <!--No content message-->
    <app-no-contents :message="messages.noContent" v-if="arrayEmpty(content)"> </app-no-contents>
    <!--Note cards and also a snippet to what whats inside the card-->
    <app-tile :data="content"
              :search="search"
              @detail="$emit('showDetails', $event)"
              @edit="updateTitle"
              @delete="$emit('delete', $event)">
    </app-tile>
  </div>
</template>

<script>
  import filterbar from '../core/skeletons/filterbar'
  import tile from './tilebody'
  export default {
    components: {
      'app-filter-bar': filterbar,
      'app-tile': tile,
    },
    props: [
      'formFields', 'content', 'messages', 'url', 'orgID'
    ],
    data: function () {
      return {
        showModal: false,
        search: '',
        formData: {},
      }
    },
    methods: {
      // Update note title
      updateTitle: function (event) {
        this.formData = event
        this.showModal = true
      },
      // cleanup
      cleanup: function () {
        this.showModal = false
        this.formData = {}
      },
      // Save the note
      saveData: function (event) {
        var data = {
          org_id: this.orgID,
          title: this.capitalizeFirstLetter(event.title),
          description: event.description
        }
        if (event.id === '') { // POST Request
          this.post(this.url, data).then(response => {
            this.$emit('update:new', this.content.push(response))
            this.cleanup()
            this.notice(this.messages.postSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.messages.postFailure, error)
          })
        } else { // PUT request
          this.patch(this.url + event.id + '/', data).then(response => {
            this.$emit('updateContent', response)
            this.cleanup()
            this.notice(this.messages.patchSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.messages.patchFailure, error)
          })
        }
      },
    }
  }
</script>
