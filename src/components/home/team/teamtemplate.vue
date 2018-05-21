<template>
  <div>
    <!--Modal to add and edit team members-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal :title="modalTitle">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Team Member')">
        </app-form>
      </app-modal>
    </b-modal>
    <!--Banner of section divider-->
    <app-banner :title=title subtitle="">
      <button class="button is-outlined" slot="banner-addon" v-on:click="addClicked">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <span>Add</span>
      </button>
    </app-banner>
    <!--Team member name cards-->
    <div class="section">
      <app-tile :data="chunkData(arrByKeyword(team, 'role', role), 4)"
                :showDate="false"
                @edit="updateClicked({id: $event.id,
                                    first_name: $event.first_name,
                                    last_name: $event.last_name,
                                    email: $event.email,
                                    phone: $event.phone,
                                    region: $event.region,
                                    role: $event.role,
                                    slack_handler: $event.slack_handler,
                                    location: $event.location,
                                    accounts: $event.accounts})"
                @delete="confirmDelete($event, 'Team Member')">
        <template slot-scope="props">
          <div class="content">
            <p>
              <strong class="title">{{ props.content.first_name }} {{ props.content.last_name }}</strong><br>
              <strong>Slack Handler: </strong> @{{ props.content.slack_handler }} <br>
              <strong>Email: </strong> {{ props.content.email }} <br>
              <strong>Phone: </strong> {{ props.content.phone }}<br>
              <strong>Theater: </strong> {{ props.content.region }} <br>
              <strong>Location: </strong> {{ props.content.location }} <br>
              <span v-if="role==='DSE'"><strong>DSE Accounts: </strong> {{ props.content.bcsteam_org_name.join() }}</span><br>
            </p>
          </div>
        </template>
      </app-tile>
    </div>
    <!--End-->
  </div>
</template>

<script>
  import banner from './../../core/skeletons/banner'
  import modal from './../../core/skeletons/modal'
  import tile from './../../core/skeletons/tile'
  export default {
    components: {
      'app-banner': banner,
      'app-modal': modal,
      'app-tile': tile
    },
    props: [
      'title', 'role', 'team', 'accounts'
    ],
    data: function () {
      return {
        modalTitle: '',         // Title of the modal
        showModal: false,       // Turn on or Off modal
        formData: {},           // placeholder for data
        formFields: {           // All the field, that is need for the generator or to build the form
          role: {
            formtype: 'select',
            label: 'Role',
            placeholder: "Select Role...",
            validate: 'required|not_in:0',
            icon: 'fas fa-street-view',
            options: [{
              id: 'DSE',
              name: 'DSE'
            }, {
              id: 'Management',
              name: 'Management'
            }]
          },
          region: {
            formtype: 'select',
            label: 'Theater',
            placeholder: "Select Theater...",
            validate: 'required|not_in:0',
            icon: 'fas fa-map-marker',
            options: [{
              id: 'APJ',
              name: 'APJ'
            }, {
              id: 'EMEA',
              name: 'EMEA'
            }, {
              id: 'AMER',
              name: 'AMER'
            }]
          },
          first_name: {
            formtype: 'input',
            label: 'First Name',
            placeholder: "Enter First Name...",
            validate: 'required|alpha_spaces|max:50',
            icon: 'fas fa-step-backward'
          },
          last_name: {
            formtype: 'input',
            label: 'Last Name',
            placeholder: "Enter Last Name...",
            validate: 'required|alpha_spaces|max:50',
            icon: 'fas fa-step-forward'
          },
          email : {
            formtype: 'input',
            label: 'Email',
            placeholder: "Enter Email Address...",
            validate: 'required|email|max:100',
            icon: 'far fa-envelope'
          },
          phone: {
            formtype: 'input',
            label: 'Phone',
            placeholder: "Enter Phone Number...",
            validate: 'required|numeric|max:50',
            icon: 'fas fa-phone'
          },
          accounts: {
            formtype: 'multiple',
            label: 'Account',
            validate: '',
            size: 4,
            options: [],
          },
          slack_handler: {
            formtype: 'input',
            label: 'Slack Handler',
            placeholder: "Enter Slack Handler...",
            validate: 'required|alpha_dash|max:50',
            icon: 'fab fa-slack'
          },
          location: {
            formtype: 'input',
            label: 'Location',
            placeholder: "Enter Team's Location...",
            validate: 'required|alpha_spaces|max:50',
            icon: 'fas fa-globe'
          }
        }
      }
    },
    methods: {
      // Add Clicked
      addClicked: function() {
        this.showModal = true
        this.modalTitle = 'Add'
        this.formData =      {
          id: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          region: '0',
          role: '0',
          slack_handler: '',
          location: '',
          accounts: []
        }
      },
      // Update team member when the update button is clicked.
      updateClicked: function (data) {
        this.showModal = true
        this.modalTitle = 'Update'
        this.formData = data
      },
      // Call this method when the save is needed.
      saveData: function (data) {
        // Lets f
        var fields = {
          first_name: this.capitalizeFirstLetter(data['first_name']),
          last_name: this.capitalizeFirstLetter(data['last_name']),
          email: data.email,
          phone: data.phone,
          region: data.region,
          role: data.role,
          slack_handler: data.slack_handler,
          location: data.location,
          accounts: data.accounts,
        }
        // if the id field is null, then its a post else its a request to update the field
        if (data.id === '') { // new team member request
          this.post(this.api.team, fields).then(response => {
            this.$emit('update:new', this.team.push(response))
            this.showModal = false
            this.notice(this.teamPostSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.teamPostFailure, error)
          })
        } else { // update team member request
          this.patch(this.api.team + data.id + '/', fields).then(response => {
            this.$emit('update:changed', this.updateElement(this.team, data.id, response))
            this.notice(this.updateTeamSuccess, 'success', 'success')
            this.showModal = false
          }).catch(error => {
            this.errorParser(this.updateTeamFailure, error)
          })
        }
      },
      // When the delete button is clicked, remove it from the database.
      deleteData: function(id) {
        this.delete(this.api.team + id + '/').then(response => {
          this.$emit('update:delete', this.removeElement(this.team, id))
          this.notice(this.deleteTeamSuccess, 'Success', 'success')
        }).catch(error => {
          this.errorParser(this.deleteTeamFailure, error)
        })
      }
    },
    watch: {
      // Watch for the changes in the account prop and make changes to the form fields
      'accounts': function() {
        this.formFields['accounts']['options'] = this.accounts
      }
    }
  }
</script>

<style scoped>
</style>
