<template>
  <section class="section">

    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
      </div>
      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <a class="button is-outlined" v-on:click="addNewTeamModal">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
            <span>Add</span>
          </a>
        </div>
      </div>
    </nav>

    <b-modal :active.sync="addEditModal" has-modal-card>
      <modal-addEdit :modalProps="modalProps"
                     v-on:addTeam="pushNewTeam($event)" v-on:updateTeam="updateTeam"> </modal-addEdit>
    </b-modal>

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            Designated Support Engineers
          </h1>
        </div>
      </div>
    </section>

    <div class="columns" v-for="teamchunk in chunked('DSE', 4)">
      <div class="column is-3" v-for="team in teamchunk">
        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong class="title">{{ team.first_name }} {{ team.last_name }}</strong><br>
                  <strong>Slack Handler: </strong> @{{ team.slack_handler }} <br>
                  <strong>Email: </strong> {{ team.email }} <br>
                  <strong>Phone: </strong> {{ team.phone }}<br>
                  <strong>Theater: </strong> {{ team.region }} <br>
                  <strong>Location: </strong> {{ team.location }} <br>
                  <strong>DSE Accounts: </strong> {{ team.bcsteam_org_name.join() }} <br>
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" aria-label="reply" v-on:click="updateTeamMember(team.id,
                                                                 team.first_name,
                                                                 team.last_name,
                                                                 team.email,
                                                                 team.phone,
                                                                 team.region,
                                                                 team.role,
                                                                 team.slack_handler,
                                                                 team.location,
                                                                 team.accounts)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                  </span>
                  </a>
                  <a class="level-item" aria-label="retweet" v-on:click="confirmDelete(team.id)">
                    <span class="icon is-small">
                      <i class="fas fa-trash" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            BCS Management
          </h1>
        </div>
      </div>
    </section>

    <div class="columns" v-for="teamchunk in chunked('Management', 4)">
      <div class="column is-3" v-for="team in teamchunk">
        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong class="title">{{ team.first_name }} {{ team.last_name }}</strong><br>
                  <strong>Slack Handler: </strong> @{{ team.slack_handler }} <br>
                  <strong>Email: </strong> {{ team.email }} <br>
                  <strong>Phone: </strong> {{ team.phone }}<br>
                  <strong>Theater: </strong> {{ team.region }} <br>
                  <strong>Location: </strong> {{ team.location }} <br>
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" aria-label="reply"  v-on:click="updateTeamMember(team.id,
                                                                 team.first_name,
                                                                 team.last_name,
                                                                 team.email,
                                                                 team.phone,
                                                                 team.region,
                                                                 team.role,
                                                                 team.slack_handler,
                                                                 team.location,
                                                                 team.accounts)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                  </span>
                  </a>
                  <a class="level-item" aria-label="retweet" v-on:click="confirmDelete(team.id)">
                    <span class="icon is-small">
                      <i class="fas fa-trash" aria-hidden="true"></i>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>


  </section>
</template>

<script>
  import modelAddEdit from './addteamform'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  var chunk = require('chunk')

  export default {
    components: {
      'modal-addEdit': modelAddEdit
    },
    mixins: [
      defaults, helpers
    ],
    data: function () {
      return {
        addEditModal: false,
        team: [],
        modalProps:  {
          title: "Add New Member",
          id: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          region: "",
          role: "",
          slack_handler: "",
          location: "",
          accounts: []
        },
      }
    },
    methods: {
      addNewTeamModal: function () {
        this.cleanForm()
        this.addEditModal = true
      },
      cleanForm: function() {
        this.modalProps =  {
          title: "Add New Member",
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            region: "",
            role: "",
            slack_handler: "",
            location: "",
            accounts: []
        }
      },
      updateTeam: function(event, id) {
        this.team.splice(this.getObjectIndex(this.team, id), 1);
        this.pushNewTeam(event)
      },
      chunked: function(role, chunkNo) {
        var tempArr = []
        for (let i in this.team) {
          if (this.team[i]['role'] === role) {
            tempArr.push(this.team[i])
          }
        }
        return chunk(tempArr, chunkNo)
      },
      pushNewTeam: function(arr) {
        this.team.push(arr)
        this.cleanForm()
      },
      deleteTeam: function(id) {
        this.axios.delete(this.api.team + id + '/').then(response => {
          this.emitMessage('Team Member Successfully Deleted', 'is-success')
          this.team.splice(this.getObjectIndex(this.team, id), 1);
        })
      },
      updateTeamMember: function(id, first, last, email, phone, region, role, slack, loc, accounts ) {
        this.modalProps =  {
          title: "Edit Team Member",
          id: id,
          first_name: first,
          last_name: last,
          email: email,
          phone: phone,
          region: region,
          role: role,
          slack_handler: slack,
          location: loc,
          accounts: accounts
        }
        this.addEditModal = true
      },
      // Delete confirmation
      confirmDelete: function (id) {
        this.$dialog.confirm({
          title: 'Deleting Team Member',
          message: 'Are you sure you want to <b>delete</b> this team member? <b>Please NOTE:</b> This action cannot be undone.',
          confirmText: 'Delete Team Member',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteTeam(id)
        })
      }
    },
    created: function () {
      this.axios.get(this.api.team).then(response => {
        this.team = response.data
      })
      return this.$store.dispatch('activeNavbarAction', 'Team')
    }
  }
</script>

<style scoped>
  .media-content {
    overflow: hidden;
  }
</style>
