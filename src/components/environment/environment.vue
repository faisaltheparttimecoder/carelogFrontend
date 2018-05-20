<!--Environment template-->
<template>
  <section class="section">
    <div class="columns">
      <!--Customers sidebar-->
      <div class="column is-2">
        <app-customer :infoSource=false v-on:selectedOrg="orgID = $event.org_id"> </app-customer>
      </div>
      <!--All the environment tab-->
      <div class="column is-10">
        <section>
          <b-tabs type="is-boxed is-right">
            <!--Account Information Page-->
            <b-tab-item label="Account Information" icon="account-convert">
              <app-account :orgID="orgID"> </app-account>
            </b-tab-item>
            <!--Contact Information Page-->
            <b-tab-item label="Contact Information" icon="phone-plus">
              <app-contact :orgID="orgID"> </app-contact>
            </b-tab-item>
            <!--Environment Details Page-->
            <b-tab-item label="Environment Details" icon="leaf">
              <app-detail :orgID="orgID"> </app-detail>
            </b-tab-item>
            <!--Environment Notes Page-->
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
  import account from './account/account'
  import contact from './contact/contact'
  import detail from './details/details'
  import notes from './notes/notes'

  export default {
    components: {
      'app-account': account,
      'app-contact': contact,
      'app-detail': detail,
      'app-notes': notes
    },
    data: function() {
      return {
        orgID: "",
      }
    },
    created: function () {
      return this.$store.dispatch('activeNavbarAction', 'Environment')
    },
  }
</script>
