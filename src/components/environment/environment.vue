<template>
  <section class="section">
    <div class="columns">
      <!--Load customer menu sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=false v-on:selectedOrg="loadEnvironment($event)"> </app-customer>
      </div>
      <div class="column is-10">
        <section>
          <b-tabs type="is-boxed is-right">

            <b-tab-item label="Account Information" icon="account-convert">
              <app-account-info :orgID="orgID"> </app-account-info>
            </b-tab-item>

            <b-tab-item label="Contact Information" icon="phone-plus">
              <app-customer-contact :orgID="orgID"> </app-customer-contact>
            </b-tab-item>

            <b-tab-item label="Environment Details" icon="leaf">
              <app-details :orgID="orgID"> </app-details>
            </b-tab-item>

            <b-tab-item label="Environment Notes" icon="onenote">
              <app-notes :orgID="orgID"> </app-notes>
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
        isFullPage: true,
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
      }
    }
  }

</script>

<style scoped>

</style>
