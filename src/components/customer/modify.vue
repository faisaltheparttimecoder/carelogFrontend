<!--Table template when the modify button is clicked-->
<template>
  <b-table
    :data="isEmpty ? [] : customerList"
    :striped="tableCustomization.isStriped"
    :narrowed="tableCustomization.isNarrowed"
    :mobile-cards="tableCustomization.hasMobileCards">
    <template slot-scope="props">
      <b-table-column field="name" label="Customer">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column field="archived_date" label="Archived Date">
        {{ props.row.archived === false ? '' : formatDate(props.row.archived_date, true) }}
      </b-table-column>
      <b-table-column label="Archive" centered>
        <a v-on:click="archiveCustomer({id: props.row.id,
                                         org_id: props.row.org_id,
                                         created_at: props.row.created_at,
                                         name: props.row.name,
                                         country: props.row.country,
                                         archived: !props.row.archived})">
          <b-icon pack="fas"
                  :icon="props.row.archived === false ? 'arrow-right' : 'arrow-left'"
                  :type="props.row.archived === false ? 'is-primary' : 'is-success'"
                  size="is-small">
          </b-icon>
        </a>
      </b-table-column>
      <b-table-column label="Delete">
        <a v-on:click="confirmDelete(props.row.id, 'Customer')">
          <b-icon pack="fas"
                  icon="trash"
                  type="is-primary"
                  size="is-small">
          </b-icon>
        </a>
      </b-table-column>
    </template>
    <!--If there is no data, then show the empty table message-->
    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large">
            </b-icon>
          </p>
          <p>{{ noCustomerModifyMessage }}</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
  export default {
    props: [
      'customerList',
    ],
    data: function () {
      return {
        isEmpty: false,
      }
    },
    methods: {
      deleteData: function (id) {
        this.delete(this.api.org + id + '/').then(response => {
          this.notice(this.deleteCustomerSuccess, 'success', 'success')
          return this.$emit('deleteOrg', id)
        }).catch(error => {
          this.errorParser(this.deleteCustomerFailure, error)
        })
      },
      archiveCustomer: function (data) {
        this.patch(this.api.org + data.id + '/', data).then(response => {
          this.notice(this.archiveCustomerSuccess, 'success', 'success')
          this.$emit('updateOrg', data.id, response)
        }).catch(error => {
          this.errorParser(this.archiveCustomerFailure, error)
        })
      },
    }
  }
</script>
