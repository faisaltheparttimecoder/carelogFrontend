<template>
  <section class="section">
    <div class="columns">

      <!--Load customer menu sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=true v-on:selectedOrg="loadOrgDashboard($event)"> </app-customer>
      </div>

      <app-nocontent v-if="urlParams.recently_added"
           :message="'Dashboard for this customer is not yet ready (sync is in progress). Come back later after 30 to 40 minutes....'">
      </app-nocontent>

      <div v-else class="column is-10">
        <app-options :options="options" v-on:refresh="fixDateFormat($event)"> </app-options>
        <app-status-bar :statusCount="collector.status_count"> </app-status-bar>

        <div class="columns">
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Creators (Top 10) </h1>
              <p> {{ urlParams.fromDate | moment('DD MMM YYYY') }} - {{ urlParams.endDate | moment('DD MMM YYYY') }} </p>
              <app-ticket-creator-chart :data="collector.top_creators"> </app-ticket-creator-chart>
            </div>
          </div>
          <div class="column is-8">
            <div class="box">
              <h1 class="heading"> Support Tickets Created by Product Components (Top 10) </h1>
              <p> {{ urlParams.fromDate | moment('DD MMM YYYY') }} - {{ urlParams.endDate | moment('DD MMM YYYY') }} </p>
              <app-product-component-chart :data="collector.top_product_components"> </app-product-component-chart>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Created by Version </h1>
              <p> {{ urlParams.fromDate | moment('DD MMM YYYY') }} - {{ urlParams.endDate | moment('DD MMM YYYY') }} </p>
              <app-by-version :data="collector.ticket_by_version"> </app-by-version>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Created by Environment </h1>
              <p> {{ urlParams.fromDate | moment('DD MMM YYYY') }} - {{ urlParams.endDate | moment('DD MMM YYYY') }} </p>
              <app-by-environment :data="collector.ticket_by_environment"> </app-by-environment>
            </div>
          </div>
          <div class="column is-4">
            <div class="box">
              <h1 class="heading"> Support Tickets Closed with reference to KB </h1>
              <p> {{ urlParams.fromDate | moment('DD MMM YYYY') }} - {{ urlParams.endDate | moment('DD MMM YYYY') }} </p>
              <app-by-kb :data="collector.ticket_by_kb"> </app-by-kb>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <div class="box">
              <h1 class="heading"> Tickets Created by Severity this Year </h1>
              <app-by-severity :data="collector.priority_tickets"> </app-by-severity>
            </div>
          </div>
          <div class="column is-6">
            <div class="box">
              <h1 class="heading"> Tickets Created / Solved For This Year </h1>
              <app-created-solved :data="collector.ticket_created_solved"> </app-created-solved>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <div class="box">
              <h1 class="heading"> Tickets Created in Last Three Years </h1>
              <app-created-3-years-chart :data="collector.tickets_created_by_month"> </app-created-3-years-chart>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script>
  import customer from './../customer/customer'
  import options from './dashboardoptions'
  import noContent from './../core/nocontent'
  import helpers from './../../mixins/helper'
  import defaults from './../../mixins/default'
  import statusBar from './statusbar'
  import ticketCreator from './ticketcreators'
  import productComponents from './ticketbyproductcomponents'
  import created3Years from './ticketcreated3years'
  import createdSolved from './ticketcreatedsolved'
  import ticketbySeverity from './ticketbyseverity'
  import ticketbyVersion from './ticketversion'
  import ticketbyEnv from './ticketenvironment'
  import ticketbyKb from './ticketkb'


  export default {
    mixins: [
      helpers, defaults
    ],
    components: {
      'app-customer': customer,
      'app-options': options,
      'app-nocontent': noContent,
      'app-status-bar': statusBar,
      'app-ticket-creator-chart': ticketCreator,
      'app-product-component-chart': productComponents,
      'app-created-3-years-chart': created3Years,
      'app-created-solved': createdSolved,
      'app-by-severity': ticketbySeverity,
      'app-by-version': ticketbyVersion,
      'app-by-environment': ticketbyEnv,
      'app-by-kb': ticketbyKb
    },
    data: function () {
      return {
        options: {
          fromDate: this.monthAgo(new Date(), 1),
          endDate: new Date(),
        },
        urlParams: {
          recently_added: false,
          fromDate: '',
          endDate: '',
          org_id: '',
        },
        chartDashboard: [
          'status_count', 'top_creators', 'top_product_components',
          'tickets_created_by_month', 'ticket_created_solved', 'priority_tickets',
          'ticket_by_version', 'ticket_by_environment', 'ticket_by_kb'
        ],
        collector: {
          'status_count': '',
          'top_creators': '',
          'top_product_components': '',
          'tickets_created_by_month': '',
          'ticket_created_solved': '',
          'priority_tickets': '',
          'ticket_by_version': '',
          'ticket_by_environment': '',
          'ticket_by_kb': '',
        }
      }
    },
    methods: {
      loadOrgDashboard: function(org) {
        this.urlParams.org_id = org.org_id
        this.urlParams.recently_added = org.recently_added
        this.fixDateFormat()
        return this.$store.dispatch('activeNavbarAction', 'Dashboard')
      },
      fixDateFormat: function(newDates) {
        if (newDates === undefined) {
          this.urlParams.fromDate = this.dateFormat(this.options.fromDate)
          this.urlParams.endDate = this.dateFormat(this.options.endDate)
        } else {
          this.urlParams.fromDate = this.dateFormat(newDates.event.fromDate)
          this.urlParams.endDate = this.dateFormat(newDates.event.endDate)
        }
        this.refreshDashboard()
      },
      refreshDashboard: function() {
        for (let i in this.chartDashboard) {
          this.axios.get(this.api.dashboard + this.chartDashboard[i] + '?options=' + Object.entries(this.urlParams).map(pair => pair.map(encodeURIComponent).join('=')).join('&')).then(response => {
            this.collector[this.chartDashboard[i]] = response.data
          })
        }
      }
    }
  }
</script>

<style>

</style>
