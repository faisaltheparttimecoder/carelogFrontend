<template>
  <form action="">

    <div class="modal-card">

      <header class="modal-card-head">
        <p class="modal-card-title"> {{ modalProps.title }} </p>
      </header>

      <section class="modal-card-body">

        <div class="field">
          <label class="label">Choose Theater Region</label>
          <div class="control">
            <div class="select">
              <select placeholder="Select Theater" v-model="modalProps.region" required>
                <option value="APJ">APJ</option>
                <option value="EMEA">EMEA</option>
                <option value="AMER">AMER</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Choose Role</label>
          <div class="control">
            <div class="select">
              <select placeholder="Select Role" v-model="modalProps.role" required>
                <option value="DSE">DSE</option>
                <option value="Management">Management</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">First Name</label>
          <div class="control">
            <input class="input" type="text" maxlength="50" v-model="modalProps.first_name"
                   placeholder="Enter First Name..." required>
          </div>
        </div>

        <div class="field">
          <label class="label">Last Name</label>
          <div class="control">
            <input class="input" type="text" maxlength="50"
                   placeholder="Enter Last Name..." v-model="modalProps.last_name"
                   required>
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" maxlength="100"
                   placeholder="Enter Email Address..." v-model="modalProps.email"
                   required>
          </div>
        </div>


        <div class="field">
          <label class="label">Phone</label>
          <div class="control">
            <input class="input" type="text" maxlength="50"
                   placeholder="Enter Contact Number..." v-model="modalProps.phone"
                   required>
          </div>
        </div>

        <div class="field" v-if="modalProps.role !== 'Management'">
          <label class="label">Account</label>
          <div class="control">
            <div class="select is-multiple">
              <select multiple size="4" v-model="modalProps.accounts">
                <option v-for="account in accounts" :value="account.id">{{ account.name }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Slack Handler</label>
          <div class="control">
            <input class="input" type="text" maxlength="50"
                   placeholder="Enter Slack Handler..." v-model="modalProps.slack_handler"
                   required>
          </div>
        </div>

        <div class="field">
          <label class="label">Location</label>
          <div class="control">
            <input class="input" type="text" maxlength="50"
                   placeholder="Enter Location..." v-model="modalProps.location"
                   required>
          </div>
        </div>

      </section>

      <footer class="modal-card-foot">
        <button class="button is-success is-outlined" @click.prevent="addNewTeam">Add</button>
        <button class="button is-danger is-outlined" type="button" @click="$parent.close()">Close</button>
      </footer>

    </div>

  </form>
</template>

<script>

  import defaults from '../../mixins/default'
  import helpers from '../../mixins/helper'
  var qs = require('qs')

  export default {
    props: [
      'modalProps'
    ],
    mixins: [
      defaults, helpers
    ],
    data: function () {
      return {
        accounts: []
      }
    },
    methods: {
      addNewTeam: function () {
        // Check if all there is data
        for (let i in this.modalProps) {
          if (i !== 'title' && i !== 'accounts' && i !== 'id' && this.modalProps[i] === "") {
            this.emitMessage("Field "+ i +" is Required", "is-danger")
            return false
          }
        }

        if (this.modalProps.id === '') {
          // Time to post
          this.axios.post(this.api.team, qs.parse({
            first_name: this.capitalizeFirstLetter(this.modalProps.first_name),
            last_name: this.capitalizeFirstLetter(this.modalProps.last_name),
            email: this.modalProps.email,
            phone: this.modalProps.phone,
            region: this.modalProps.region,
            role: this.modalProps.role,
            slack_handler: this.modalProps.slack_handler,
            location: this.modalProps.location,
            accounts: this.modalProps.accounts,
          })).then(response => {
            this.emitMessage("Successfully posted new member", "is-success")
            this.$emit('addTeam', response.data)
            return this.$parent.close()
          }).catch(e => {
            this.emitMessage("Failure in Posting the team information, check the browser log for more information", "is-danger")
            console.log(e)
            console.log(e.response)
          })
        } else {
          // Time to post
          this.axios.put(this.api.team + this.modalProps.id + '/', qs.parse({
            first_name: this.capitalizeFirstLetter(this.modalProps.first_name),
            last_name: this.capitalizeFirstLetter(this.modalProps.last_name),
            email: this.modalProps.email,
            phone: this.modalProps.phone,
            region: this.modalProps.region,
            role: this.modalProps.role,
            slack_handler: this.modalProps.slack_handler,
            location: this.modalProps.location,
            accounts: this.modalProps.accounts,
          })).then(response => {
            this.emitMessage("Successfully Updated team member", "is-success")
            this.$emit('updateTeam', response.data, this.modalProps.id)
            return this.$parent.close()
          }).catch(e => {
            this.emitMessage("Failure in Updating the team information, check the browser log for more information", "is-danger")
            console.log(e)
            console.log(e.response)
          })
        }
      }
    },
    created: function () {
      this.axios.get(this.api.org).then(response => {
        this.accounts = response.data
      })
    }
  }

</script>
