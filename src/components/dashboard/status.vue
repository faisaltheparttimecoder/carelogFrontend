<template>
  <app-status-bar :status="statusTickets"> </app-status-bar>
</template>

<script>
  import statusBar from './../core/skeletons/statusbar'
  export default {
    props: [
      'statusCount'
    ],
    components: {
      'app-status-bar': statusBar
    },
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
