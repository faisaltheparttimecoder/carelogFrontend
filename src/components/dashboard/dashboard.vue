<template>
  <section class="section">
    <div class="columns">
      <!--Load customer menu sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=true @selectedOrg="loadOrgDashboard"> </app-customer>
      </div>
      <!--If the customer is recently added, then tell them to wait till the background job finish to load the ticket data-->
      <app-no-contents v-if="urlParams.recently_added" :message="recentlyAddedCustomer"> </app-no-contents>
      <!--All the dashboard charts and options-->
      <div v-else class="column is-10">
        <!--Option bar, which allow customers to change the date for the data-->
        <app-option-bar title="Dashboard"
                        :switches="switches"
                        v-on:refresh="fixDateFormat(options)"
                        :options.sync="options">
        </app-option-bar>
        <!--Status bar -->
        <app-status-bar :statusCount="collector.status_count"> </app-status-bar>
        <!--All the charts-->
        <div class="columns">
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Creators (Top 10) </h1>
              <p> {{ dateRange }} </p>
              <app-pie-chart :data="collector.top_creators"> </app-pie-chart>
            </div>
          </div>
          <div class="column is-8">
            <div class="box">
              <h1 class="heading"> Support Tickets Created by Product Components (Top 10) </h1>
              <p> {{ dateRange  }} </p>
              <app-funnel-chart :data="collector.top_product_components"> </app-funnel-chart>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Created by Version </h1>
              <p> {{ dateRange  }} </p>
              <app-pie-chart :data="collector.ticket_by_version"> </app-pie-chart>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Created by Environment </h1>
              <p> {{ dateRange }} </p>
              <app-pie-chart :data="collector.ticket_by_environment"> </app-pie-chart>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Closed with reference to KB </h1>
              <p> {{ dateRange }} </p>
              <app-pie-chart :data="collector.ticket_by_kb"> </app-pie-chart>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6">
            <div class="box">
              <h1 class="heading"> Tickets Created by Severity this Year </h1>
              <app-multiple-line :data="collector.priority_tickets"> </app-multiple-line>
            </div>
          </div>
          <div class="column is-6">
            <div class="box">
              <h1 class="heading"> Tickets Created / Solved For This Year </h1>
              <app-multiple-line :data="collector.ticket_created_solved"> </app-multiple-line>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <div class="box">
              <h1 class="heading"> Tickets Created in Last Three Years </h1>
              <app-multiple-line :data="collector.tickets_created_by_month"> </app-multiple-line>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import optionBar from './../core/skeletons/optionbar'
  import statusBar from './status'
  import funnel from './../charts/funnel'
  import multipleLine from './../charts/line'
  import pieChart from './../charts/pie'
  export default {
    components: {
      'app-option-bar': optionBar,
      'app-status-bar': statusBar,
      'app-funnel-chart': funnel,
      'app-multiple-line': multipleLine,
      'app-pie-chart': pieChart,
    },
    data: function () {
      return {
        dateRange: '',
        switches: {
          priority: false,
          closed: false,
        },
        options: {
          fromDate: new Date(this.monthAgo(1)),
          endDate: new Date(this.monthAgo(0)),
        },
        urlParams: {
          recently_added: false,
          fromDate: '',
          endDate: '',
          org_id: '',
        },
        collector: {
          'status_count': [],
          'top_creators': [],
          'top_product_components': [],
          'tickets_created_by_month': [],
          'ticket_created_solved': [],
          'priority_tickets': [],
          'ticket_by_version': [],
          'ticket_by_environment': [],
          'ticket_by_kb': [],
        }
      }
    },
    methods: {
      loadOrgDashboard: function(org) {
        this.urlParams.org_id = org.org_id
        this.urlParams.recently_added = org.recently_added
        this.fixDateFormat()
      },
      fixDateFormat: function() {
        this.urlParams.fromDate = this.dateFormat(this.options.fromDate, '/')
        this.urlParams.endDate = this.dateFormat(this.options.endDate, '/')
        this.dateRange = this.urlParams.fromDate + ' - ' + this.urlParams.endDate
        this.refreshDashboard()
      },
      refreshDashboard: function() {
        for (let i in this.collector) {
          this.get(this.api.dashboard + i + '?options=' + Object.entries(this.urlParams).map(pair => pair.map(encodeURIComponent).join('=')).join('&')).then(response => {
            this.collector[i] = response
          }).catch(error => {
            this.errorParser(this.dashboardDataFailure, error)
          })
        }
      },
    },
    created: function () {
      return this.$store.dispatch('activeNavbarAction', 'Dashboard')
    }
  }
</script>
