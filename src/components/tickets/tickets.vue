<template>
  <section class="section">
    <div class="columns">
      <!--Load customer menu sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=true @selectedOrg="loadTicketTable"> </app-customer>
      </div>
      <!--Load the ticket data-->
      <div class="column is-10">
        <div v-if="!isDetails">
          <!--Using keep alive to keep the data in memory when switching the component so that-->
          <!--we dont have to refresh the data again-->
          <keep-alive>
            <!--Option bar, which allow customers to change the date for the data-->
            <app-option-bar title="Tickets"
                            :switches="switches"
                            v-on:refresh="loadTicketTable(options)"
                            :options.sync="options">
            </app-option-bar>
          </keep-alive>
          <app-table :tableData="tableData"
                     :ticketAttributes="ticketAttributes"
                     :orgID="org_id"
                     v-on:details="loadDetails($event)">
          </app-table>
        </div>
        <!--Ticket Detail page-->
        <app-details v-if="isDetails"
                     v-on:closeDetails="isDetails=false"
                     :ticket="ticketNo"
                     :orgID="org_id">
        </app-details>
      </div>
    </div>
  </section>

</template>

<script>
  import optionBar from './../core/skeletons/optionbar'
  import table from './table'
  import details from './details'
  import DotLoader from "vue-spinner/src/DotLoader";
  export default {
    components: {
      DotLoader,
      'app-option-bar': optionBar,
      'app-table': table,
      'app-details': details
    },
    data: function () {
      return {
        switches: {
          priority: true,
          closed: true,
        },
        options: {
          fromDate: new Date(this.monthAgo(1)),
          endDate: new Date(this.monthAgo(0)),
          excludeClosed: true,
          priority: 'all'
        },
        tableData: [],
        ticketAttributes: {},
        customer: '',
        org_id: '',
        isDetails: false,
        ticketNo: '',
      }
    },
    methods: {
      // Generate URL based on options selected.
      generateURL: function () {
        var url = this.api.search + 'ticket organization:'  // Base url
        url = url + this.customer  // Add Org name
        url = url + ' updated>=' + this.dateFormat(this.options.fromDate, '-') // Add the updated from
        url = url + ' updated<=' + this.dateFormat(this.options.endDate, '-') // Add the updated end date
        if (this.options.priority !== 'all') { // Add priority
          url = url + ' priority:' + this.options.priority
        }
        if (this.options.excludeClosed) { // Add status
          url = url + ' status<solved'
        }
        return url
      },
      // Load ticket data
      loadTicketTable: function (events) {
        this.isDetails = false
        if (events.who === 'customer') { // Update the values based on who send the event
          this.customer = events.zendesk_org_id
          this.org_id = events.org_id
        }
        this.get(this.generateURL()).then(response => {
          this.tableData = response.results
          this.ticketAttributes = response.tickets_attributes
          this.$emit('loadingOff')
        }).catch(error => {
          this.errorParser(this.ticketLoadFailure, error)
        })
      },
      // Turn on the details page.
      loadDetails: function (ticketNo) {
        this.ticketNo = ticketNo
        this.isDetails = true
      }
    },
    created: function () {
      return this.$store.dispatch('activeNavbarAction', 'Tickets')
    },
  }
</script>

<style scoped>
</style>
