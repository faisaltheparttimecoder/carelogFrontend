<template>
  <div class="modal-card" style="width: 960px" >

    <header class="modal-card-head">
      <p class="modal-card-title"> Modify the customer list </p>
    </header>

    <section class="modal-card-body">

      <b-table
        :data="isEmpty ? [] : customerList"
        :striped="tableCustomization.isStriped"
        :narrowed="tableCustomization.isNarrowed"
        :mobile-cards="tableCustomization.hasMobileCards">

        <template slot-scope="props">
          <b-table-column field="name" label="Customer" width="400">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="archived_date" label="Archived Date" width="150">
            {{ props.row.archived === false ? '' : dateFormat(props.row.archived_date) }}
          </b-table-column>

          <b-table-column label="Archive" centered>
            <a v-on:click="archiveCustomer(props.row.id,
                                           props.row.org_id,
                                           props.row.created_at,
                                           props.row.name,
                                           props.row.country,
                                           props.row.archived,
                                          )"><b-icon
              pack="fas"
              :icon="props.row.archived === false ? 'arrow-right' : 'arrow-left'"
              :type="props.row.archived === false ? 'is-primary' : 'is-success'"
              size="is-small">
            </b-icon></a>
          </b-table-column>

          <b-table-column label="Delete">
            <a v-on:click="confirmDelete(props.row.id)"><b-icon
              pack="fas"
              icon="trash"
              type="is-primary"
              size="is-small">
            </b-icon></a>
          </b-table-column>

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

    <footer class="modal-card-foot">
      <button class="button is-danger is-outlined" type="button" @click="$parent.close()">Close</button>
    </footer>

  </div>
</template>

<script>
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  var qs = require('qs')

  export default {
    props: [
      'customerList'
    ],
    mixins: [
      defaults, helpers
    ],
    data: function () {
      return {
        isEmpty: false,
      }
    },
    methods: {
      deleteCustomer: function (id) {
        this.axios.delete(this.api.org + id + '/').then(response => {
          this.emitMessage('Organisation Successfully Deleted', 'is-success')
          this.$parent.close()
          return this.$emit('deleteOrg', id)
        }).catch(e => {
          this.emitMessage('Organization deletion failed, check browser console log for more information', 'is-danger')
          console.log(e)
          console.log(e.response)
        })
      },
      archiveCustomer: function (id, org, created, name, country, state) {
        state = !state
        this.axios.put(this.api.org + id + '/', qs.stringify({
          org_id: org,
          created_at: created,
          name: name,
          country: country,
          archived: state
        })).then(response => {
          this.emitMessage('Organisation Successfully Archived', 'is-success')
          this.$parent.close()
          return this.$emit('updateOrg', id, response.data)
        }).catch(e => {
          this.emitMessage('Organization archive failed, check browser console log for more information', 'is-danger')
          console.log(e)
          console.log(e.response)
        })
      },
      // Delete confirmation
      confirmDelete: function (id) {
        this.$dialog.confirm({
          title: 'Deleting Customer',
          message: 'Are you sure you want to <b>delete</b> this Customer? <b>Please NOTE:</b> This action cannot be undone.',
          confirmText: 'Delete Customer',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteCustomer(id)
        })
      }
    }
  }

</script>
