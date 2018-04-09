<template>
  <div class="box">
    <nav class="level is-mobile">
      <div v-for='(status, index) in statusTickets' class="level-item has-text-centered">
        <div>
          <p class="heading">{{ index }}</p>
          <p class="title">{{ status }}</p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    props: [
      'statusCount'
    ],
    data: function() {
      return {
        ticketStatus: {
          total: 0,
          open: 0,
          pending: 0,
          hold: 0,
          'closed/solved': 0
        }
      }
    },
    computed: {
      statusTickets: function() {
        this.ticketStatus = {
          total: 0,
            open: 0,
            pending: 0,
            hold: 0,
            'closed/solved': 0
        }
        for (let i in this.statusCount) {
          this.ticketStatus.total = this.ticketStatus.total + this.statusCount[i].total
          if ( this.statusCount[i].status === 'closed' || this.statusCount[i].status === 'solved') {
            this.ticketStatus['closed/solved'] =  this.ticketStatus['closed/solved'] + this.statusCount[i].total
          } else {
            this.ticketStatus[this.statusCount[i].status] = this.statusCount[i].total
          }
        }
        return this.ticketStatus
      }
    }
  }
</script>

<style>

</style>
