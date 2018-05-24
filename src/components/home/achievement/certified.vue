<template>
  <section>
    <!--The modal & form to add the certification-->
    <b-modal :active.sync="showModal" has-modal-card>
      <app-modal title="Team's Achievement">
        <app-form :formFields="formFields"
                  slot="modal-body"
                  :formData.sync="formData"
                  v-on:saveData="confirmSave($event, 'Team Member')">
        </app-form>
      </app-modal>
    </b-modal>
    <!--The card-->
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by3">
          <img src="../../../assets/medal.png" alt="Placeholder image" height="58">
        </figure>
      </div>
      <div class="card-content">
        <div v-for="user in certifiedUsers">
          <hr class="style14">
          <nav class="level is-mobile">
            <div class="level-left">
            </div>
            <div class="level-right">
              <a class="level-item" @click="formData = {id: user.id,
                                                        team_id: user.team_id,
                                                        certification: user.certification}; showModal = true">
                <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
              </a>
              <a class="level-item" @click="confirmDelete(user.id, 'Certification')">
                <span class="icon is-small"><i class="fas fa-trash"></i></span>
              </a>
            </div>
          </nav>
          <div class="has-text-centered">
            <h1 class="title is-2">{{ user.bcs_team_achievement }}</h1>
            <h6 class="subtitle is-6" style="margin-bottom: 1%;">{{ user.certification }}</h6>
          </div>
        </div>
        <hr class="style14">
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: [
      'showForm'
    ],
    data: function() {
      return {
        certifiedUsers: [],
        showModal: false,
        formData: {id: '', team_id: '0'},  // To save the form input
        formFields: {  // All the field, that is need for the generator or to build the form
          team_id: {
            formtype: 'select',
            label: 'DSE',
            placeholder: "Select DSE...",
            validate: 'required|not_in:0',
            icon: 'fas fa-user',
            options: []
          },
          certification: {
            formtype: 'input',
            label: 'Certification',
            placeholder: "Enter Certification Name...",
            validate: 'required|alpha_spaces|max:300',
            icon: 'fas fa-certificate'
          },
        }
      }
    },
    methods: {
      // Save the data
      saveData: function() {
        this.formData.certification = this.capitalizeFirstLetter(this.formData.certification)
        if (this.formData.id === '') { // POST
          this.post(this.api.certification, this.formData).then(response => {
            this.certifiedUsers.push(response)
            this.showModal = false
            this.notice(this.certifiedSaveSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.certifiedSaveFailure, error)
          })
        } else {  // PATCH
          this.patch(this.api.certification + this.formData.id + '/', this.formData).then(response => {
            this.updateElement(this.certifiedUsers, this.formData.id, response)
            this.showModal = false
            this.notice(this.certifiedUpdateSuccess, 'success', 'success')
          }).catch(error => {
            this.errorParser(this.certifiedUpdateFailure, error)
          })
        }
      },
      // delete the data
      deleteData: function (event) {
        this.delete(this.api.certification + event + '/').then(response => {
          this.removeElement(this.certifiedUsers, event)
          this.notice(this.certifiedDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.certifiedDeleteFailure, error)
        })
      }
    },
    created: function () {
      // Get all the saved team members
      this.get(this.api.team).then(response => {
        if (!this.arrayEmpty(response)) {
          for (let i in response) {
            var team = {}
            team = {
              id: response[i]['id'],
              name: response[i]['first_name'] + ' ' + response[i]['last_name']
            }
            this.formFields.team_id.options.push(team)
          }
        }
      }).catch(error => {
        this.errorParser(this.teamLoadFailure, error)
      })
      // Get all the certified user list
      this.get(this.api.certification).then(response => {
         this.certifiedUsers = response
      }).catch(error => {
         this.errorParser(this.certificationUserLoadFailure, error)
      })
    },
    watch: {
      // Open the modal
      'showForm': function () {
        this.formData = {id: '', team_id: '0'}
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
  nav.level.is-mobile {
    margin-bottom: -1%;
  }
  a {
    z-index: 9;
  }
  hr.style14 {
    border: 1px solid;
    height: 1px;
    background-image: -webkit-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -moz-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -ms-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
    background-image: -o-linear-gradient(left, #f0f0f0, #8c8b8b, #f0f0f0);
  }
</style>
