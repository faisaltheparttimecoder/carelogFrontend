<template>
  <section class="section">
    <div class="columns">

      <!--Load customer menu sidebar-->
      <div class="column is-2">
          <app-customer v-on:selectedOrg="loadTicketTable($event)"> </app-customer>
      </div>

      <!--Load the ticket data-->
      <div class="column is-10">

        <!--Using keep alive to keep the data in memory when switching the component so that-->
        <!--we dont have to refresh the data again-->
        <div v-if="!isDetails">
          <keep-alive>
            <app-options :options="options"  v-on:refresh="loadTicketTable($event)"> </app-options>
          </keep-alive>
          <app-table :tableData="tableData"
                     :hotTickets="hotTickets"
                     :loading="loading"
                     :orgID="org_id"
                     v-on:details="loadDetails($event)">
          </app-table>
        </div>

        <app-details v-if="isDetails" v-on:closeDetails="isDetails=false" :ticket="ticketNo" :orgID="org_id"> </app-details>

      </div>

    </div>
  </section>

</template>

<script>
  import customer from './../customer/customer'
  import options from './ticketoptions'
  import ticketTab from './tickettables'
  import helper from './../../mixins/helper'
  import defaults from './../../mixins/default'
  import details from './ticketdetails'

  export default {
    components: {
      'app-customer': customer,
      'app-options': options,
      'app-table': ticketTab,
      'app-details': details
    },

    mixins: [
      helper, defaults
    ],

    data: function () {
      return {
        tableData: [],
        hotTickets: {},
        options: {
          status: 'all',
          fromDate: this.monthAgo(new Date(), 1),
          endDate: new Date(),
          excludeClosed: true,
          priority: 'all'
        },
        customer: '',
        org_id: '',
        loading: false,
        isDetails: false,
        ticketNo: '',
      }
    },

    methods: {
      // Load ticket data
      loadTicketTable: function (events) {
        this.loading = true
        this.isDetails = false
        // Update the values based on who send the event
        if (events.who === 'customer') {
          this.customer = events.event
          this.org_id = events.org_id
        } else {
          this.options = events.event
        }
        // Load the data based on the request
        this.axios.get(this.generateURL()).then(response => {
          this.tableData = response.data.results
          this.hotTickets = response.data.hot_tickets
          this.loading = false
        }).catch(error => {
          console.log(error)
          console.log(error.response.data)
          this.emitMessage("FAILURE: Table loading failure, Check the browser log for more information.")
        })
      },
      // Generate URL based on options selected.
      generateURL: function () {
        // Base url
        var url = this.api.search + 'ticket organization:'
        // Add Org name
        url = url + this.customer
        // Add the updated from & end date
        url = url + ' updated>=' + this.dateFormat(this.options.fromDate) + ' updated<=' + this.dateFormat(this.options.endDate)
        // Add priority
        if (this.options.priority !== 'all') {
          url = url + ' priority:' + this.options.priority
        }
        // Add status
        if (this.options.excludeClosed) {
          url = url + ' status<solved'
        }
        return url
      },
      // Turn on the details page.
      loadDetails: function(ticketNo){
        this.ticketNo = ticketNo
        this.isDetails = true
      }
    }
  }
</script>

<style scoped>
</style>
