<template>
  <section class="section">
    <!--Show drop down to select number of entries from the table-->
    <b-table
      :data="tableCustomization.isEmpty ? []:tableData"
      :narrowed="tableCustomization.isNarrowed"
      :striped="tableCustomization.isStriped"
      :default-sort-direction="tableCustomization.defaultSortDirection"
      :mobile-cards="tableCustomization.hasMobileCards"
      default-sort="date"
      detailed
      detail-key="id">
      <!--Column template-->
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
        <b-table-column field="date" label="Created" sortable centered>
          {{ formatDate(props.row.created_at, false) }}
        </b-table-column>
        <b-table-column field="date" label="Updated" sortable centered>
          {{ formatDate(props.row.updated_at, false) }}
        </b-table-column>
        <b-table-column field="status" label="Status" centered sortable>
          {{ props.row.status }}
        </b-table-column>
        <b-table-column field="action" label="Hot" centered>
          <a v-on:click="ticketAttr(orgID, props.row.id)">
            <b-switch type="is-danger" v-model="ticketAttributes['zd'+orgID+props.row.id+'hot']"> </b-switch>
          </a>
        </b-table-column>
        <b-table-column field="action" label="Awaiting Patch" centered>
          <a v-on:click="ticketAttr(orgID, props.row.id)">
            <b-switch type="is-primary" v-model="ticketAttributes['zd'+orgID+props.row.id+'patch']"> </b-switch>
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
      <!--If the ticket table is empty-->
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>{{ noTicketMessage }}</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
  import debounce from 'lodash/debounce'
  export default {
    props: [
      'tableData', 'ticketAttributes', 'orgID'
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
      ticketAttr: debounce(function (orgId, ticketId) {
        var hotSwitchTag = 'zd' + orgId + ticketId + 'hot'
        var patchSwitchTag = 'zd' + orgId + ticketId + 'patch'
        this.post(this.api.ticketAttribute, {
          ticket_id: ticketId,
          org_id: orgId,
          hot: this.isUndefinedBool(this.ticketAttributes[hotSwitchTag]),
          patch: this.isUndefinedBool(this.ticketAttributes[patchSwitchTag])
        }).then(response => {
        }).catch(error => {
          this.errorParser(this.ticketAttributeRegisterError, error)
        })
      }),
    },
  }
</script>
