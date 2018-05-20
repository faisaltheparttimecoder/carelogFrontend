<template>
  <section>
    <app-team-template title="Designated Support Engineers"
                       role="DSE"
                       :team.sync="team" :accounts="accounts">
    </app-team-template>
    <app-team-template title="BCS Management"
                       role="Management"
                       :team.sync="team" :accounts="accounts">
    </app-team-template>
  </section>
</template>

<script>
  import teamTemplate from './teamtemplate'
  export default {
    components: {
      'app-team-template': teamTemplate
    },
    data: function () {
      return {
        team: [],
        accounts: []
      }
    },
    created: function () {
      // Get all the saved team members
      this.get(this.api.team).then(response => {
        this.team = response
      }).catch(error => {
        this.errorParser(this.teamLoadFailure, error)
      })
      // Get all the account information that we know about
      this.get(this.api.org).then(response => {
        this.accounts = response
      }).catch(error => {
        this.errorParser(this.customerLoadFailure, error)
      })
      // Highlight the navbar
      return this.$store.dispatch('activeNavbarAction', 'Team')
    }
  }
</script>
