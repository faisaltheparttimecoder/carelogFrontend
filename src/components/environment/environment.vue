<template>
  <section class="section">
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>
    <div class="columns">
      <!--Load customer menu sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=false v-on:selectedOrg="loadEnvironment($event)"> </app-customer>
      </div>
      <div class="column is-10">
        <section>
          <b-tabs type="is-boxed is-right">

            <b-tab-item label="Account Information" icon="account-convert">
              <app-account-info :info="collector.account_info[0]" :orgID="orgID"> </app-account-info>
            </b-tab-item>

            <b-tab-item label="Contact Information" icon="phone-plus">
              <app-customer-contact :info="collector.contact_info[0]" :orgID="orgID"> </app-customer-contact>
            </b-tab-item>

            <b-tab-item label="Environment Details" icon="leaf">
              <app-details :orgID="orgID"> </app-details>
            </b-tab-item>

            <b-tab-item label="Environment Notes" icon="onenote">
              <app-notes :info="collector.environment_notes" :orgID="orgID"> </app-notes>
            </b-tab-item>

          </b-tabs>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import customer from './../customer/customer'
  import accountInfo from './accountinformation'
  import customerContact from './contactInformation'
  import notes from './environmentnotes'
  import details from './environmentdetails'
  import defaults from './../../mixins/default'

  export default {
    components: {
      'app-customer': customer,
      'app-account-info': accountInfo,
      'app-customer-contact': customerContact,
      'app-notes': notes,
      'app-details': details
    },
    data: function() {
      return {
        orgID: "",
        isLoading: false,
        isFullPage: true,
        environment: [
          'account_info', 'contact_info', 'environment_notes'
        ],
        orginalCollector: {
          'account_info': [{
            info: '',
            org_id: '',
            updated: '',
            id: ''
          }],
          'contact_info': [{
            info: '',
            org_id: '',
            updated: '',
            id: ''
          }],
          'environment_notes': [{
            info: '',
            org_id: '',
            title: '',
            created: '',
            update: '',
            id: ''
          }],
        },
        collector: {
          'account_info': [{
            info: '',
            org_id: '',
            updated: '',
            id: ''
          }],
          'contact_info': [{
            info: '',
            org_id: '',
            updated: '',
            id: ''
          }],
          'environment_notes': [{
            info: '',
            org_id: '',
            title: '',
            created: '',
            update: '',
            id: ''
          }],
        }
      }
    },
    mixins: [
      defaults
    ],
    created: function () {
      return this.$store.dispatch('activeNavbarAction', 'Environment')
    },
    methods: {
      loadEnvironment: function (event) {
        this.orgID = event.org_id;
        this.isLoading = true
        for (let i in this.environment) {
          this.collector[this.environment[i]] = this.orginalCollector[this.environment[i]]
          this.axios.get(this.api.environment + this.environment[i] + '/?org_id=' + this.orgID ).then(response => {
            if (response.data.length > 0 ) {
              this.collector[this.environment[i]] = response.data
            }
          }).catch(e => {
            console.log(e)
            console.log(e.response)
          })
        }
        this.isLoading = false
      }
    }
  }

</script>

<style scoped>

</style>
