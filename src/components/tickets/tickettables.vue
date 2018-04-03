<template>
  <section class="section">
    <!--Show drop down to select number of entries from the table-->
    <b-table
      :data="tableCustomization.isEmpty ? []:tableData"
      :narrowed="tableCustomization.isNarrowed"
      :striped="tableCustomization.isStriped"
      :default-sort-direction="tableCustomization.defaultSortDirection"
      :mobile-cards="tableCustomization.hasMobileCards"
      :loading="loading"
      default-sort="updated"
      detailed
      detail-key="id">

      <template slot-scope="props">

        <b-table-column field="id" label="Ticket ID" width="40" numeric sortable>
          <a target="_blank" :href="'https://discuss.zendesk.com/agent/tickets/'+props.row.id">{{ props.row.id }}</a>
        </b-table-column>

        <b-table-column field="subject" label="Subject" sortable>
          {{ props.row.subject }}
        </b-table-column>

        <b-table-column field="priority" label="Priority" sortable>
          {{ priorityTable[props.row.priority] }}
        </b-table-column>

        <b-table-column field="created" label="Created" centered sortable>
          {{ dateFormat(props.row.created_at) }}
        </b-table-column>

        <b-table-column field="updated" label="Updated" centered sortable>
          {{ dateFormat(props.row.updated_at) }}
        </b-table-column>

        <b-table-column field="status" label="Status" centered sortable>
          {{ props.row.status }}
        </b-table-column>

        <b-table-column field="action" label="Hot" centered>
          <a v-on:click="itsHot(orgID, props.row.id)">
            <b-switch type="is-danger"
                      v-model="hotTickets['zd'+orgID+props.row.id]">
            </b-switch>
          </a>
        </b-table-column>

        <b-table-column field="action" label="Action" centered>
          <a class="button is-outlined" v-on:click="ticketDetails(props.row.id)"> Details </a>
        </b-table-column>

      </template>

      <!--Table rows content-->
      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p v-html="replaceStringToHtml(props.row.description)">
              </p>
            </div>
          </div>
        </article>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>

    </b-table>
  </section>
</template>

<script>
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'

  var qs = require('qs')
  import debounce from 'lodash.debounce'

  export default {
    props: [
      'tableData', 'loading', 'hotTickets', 'orgID'
    ],
    mixins: [
      defaults, helpers
    ],
    data: function () {
      return {
        selected: false,
        priorityTable: {
          urgent: 'S1',
          high: 'S2',
          normal: 'S3',
          low: 'S4'
        },
      }
    },
    methods: {
      // Get the details of the ticket
      ticketDetails: function (ticketNo) {
        return this.$emit('details', ticketNo)
      },
      // Store the ticket hotness to the database
      itsHot: debounce(function (orgId, ticketId) {
        var clickedSwitch = 'zd' + orgId + ticketId
        var selected = this.hotTickets[clickedSwitch]
        if (selected) {
          this.axios.post(this.api.ticketHot, qs.stringify({
            ticket_id: ticketId,
            org_id: orgId,
            hot: selected
          })).then(response => {
            this.hotTickets[clickedSwitch] = selected
          })
        } else {
          this.axios.delete(this.api.ticketHot + ticketId).then(response => {
          })
        }
      }),
    },
  }
</script>
