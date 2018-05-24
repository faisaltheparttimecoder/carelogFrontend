<template>
  <div>
    <!--Add or update form-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal title="Feedback">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Feedback')">
        </app-form>
      </app-modal>
    </b-modal>
    <!--The feedback card-->
    <app-tile :data="chunkData(feedback, 2)"
              :showDate="false"
              @edit="formData = {id: $event.id,
                                 receiver: $event.receiver,
                                 received_date: new Date($event.received_date),
                                 sender: $event.sender,
                                 sender_title: $event.sender_title,
                                 sender_org: $event.sender_org,
                                 feedback: $event.feedback}; showModal=true"
              @delete="confirmDelete($event, 'Feedback')">
      <template slot-scope="props">
        <h1 class="title is-3"> {{ props.content.receiver }} </h1>
        <h6 class="subtitle is-6"> {{ timelineDateFormat(props.content.received_date, false) }} </h6>
        <blockquote>
          <p>{{ props.content.feedback }}... </p>
        </blockquote>
        <strong>{{ props.content.sender }}</strong> <br>
        <span v-if="props.content.sender_title !== '' && props.content.sender_title !== null">{{ props.content.sender_title }} </span>
        <span v-if="props.content.sender_org !== '' && props.content.sender_org !== null ">({{ props.content.sender_org }})</span>
      </template>
    </app-tile>
  </div>
</template>

<script>
  import tile from './../../core/skeletons/tile'
  export default {
    props: [
      'showForm'
    ],
    components: {
      'app-tile': tile
    },
    data: function () {
      const today = new Date()
      return {
        feedback: [],
        showModal: false,
        formData: {id: ''},  // To save the form input
        formFields: {  // All the field, that is need for the generator or to build the form
          receiver: {
            formtype: 'input',
            label: 'Receiver\'s Name',
            placeholder: "Enter receiver\'s name...",
            validate: 'required|max:200',
            icon: 'far fa-user-circle'
          },
          received_date: {
            formtype: 'date',
            label: 'Received Date',
            maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
            placeholder: "Enter the date when the feedback was received...",
            validate: 'required',
            icon: 'far fa-sticky-note'
          },
          sender: {
            formtype: 'input',
            label: 'Sender\'s Name',
            placeholder: "Enter sender\'s name...",
            validate: 'required|max:100',
            icon: 'fas fa-user'
          },
          sender_title: {
            formtype: 'input',
            label: 'Sender\'s Title',
            placeholder: "Enter senders title or designation...",
            validate: 'max:100',
            icon: 'far fa-id-card'
          },
          sender_org: {
            formtype: 'input',
            label: 'Sender\'s Org',
            placeholder: "Enter the org name of the sender...",
            validate: 'max:100',
            icon: 'fas fa-building'
          },
          feedback: {
            formtype: 'textarea',
            label: 'Feedback',
            placeholder: "Enter the feedback......",
            validate: 'required|max:5000',
            rows: 5
          },
        }
      }
    },
    methods: {
      // Save the data
      saveData: function () {
        this.formData.receiver = this.capitalizeFirstLetter(this.formData.receiver)
        this.formData.sender = this.capitalizeFirstLetter(this.formData.sender)
        if (this.formData.id === '') { // POST
          this.post(this.api.feedback, this.formData).then(response => {
            this.feedback.push(response)
            this.showModal = false
            this.formData = {id: ''}
            this.notice(this.feedbackSaveSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.feedbackSaveFailure, error)
          })
        } else { // PUT
          this.patch(this.api.feedback + this.formData.id + '/', this.formData).then(response => {
            this.updateElement(this.feedback, this.formData.id, response)
            this.showModal = false
            this.formData = {id: ''}
            this.notice(this.feedbackUpdateSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.feedbackUpdateFailure, error)
          })
        }
      },
      // Delete Data
      deleteData: function (id) {
        this.delete(this.api.feedback + id + '/').then(response => {
          this.removeElement(this.feedback, id)
          this.notice(this.feedbackDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.feedbackDeleteFailure, error)
        })
      }
    },
    created: function () {
      // Get all the feedback
      this.get(this.api.feedback).then(response => {
        this.feedback = response
      }).catch(error => {
        this.errorParser(this.feedbackLoadFailure, error)
      })
    },
    watch: {
      // Open the modal
      'showForm': function () {
        this.formData = {id: ''}
        this.showModal = this.showForm
      },
      // Notify the parent that modal has been closed
      'showModal': function () {
        if (!this.showModal) {
          this.formData = {id: '', team_id: '0'}
          this.$emit('closeModal')
        }
      },
    }
  }
</script>

<style scoped>
  blockquote{
    display:block;
    background: #fff;
    padding: 15px 20px 15px 45px;
    margin: 0 0 20px;
    position: relative;
  }
  blockquote::before{
    content: "\201C"; /*Unicode for Left Double Quote*/

    /*Font*/
    font-family: Georgia, serif;
    font-size: 60px;
    font-weight: bold;
    color: #999;

    /*Positioning*/
    position: absolute;
    left: 10px;
    top:5px;

  }
  blockquote::after{
    /*Reset to make sure*/
    content: "";
  }
  blockquote em{
    font-style: italic;
  }
</style>
