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
              <app-account-info :info="collector.account_info"
                                :orgID="orgID"
              > </app-account-info>
            </b-tab-item>
            <b-tab-item label="Contact Information" icon="phone-plus">

            </b-tab-item>
            <b-tab-item label="Environment Details" icon="leaf">

            </b-tab-item>
          </b-tabs>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
  import customer from './../customer/customer'
  import accountInfo from './accountinfo'
  import defaults from './../../mixins/default'

  export default {
    components: {
      'app-customer': customer,
      'app-account-info': accountInfo
    },
    data: function() {
      return {
        orgID: "",
        environment: [
          'account_info',
        ],
        collector: {
          'account_info': {
            info: '',
            org_id: '',
            id: ''
          }
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
        for (let i in this.environment) {
          this.axios.get(this.api.environment + this.environment[i] + '/?org_id=' + this.orgID ).then(response => {
            if (response.data[0] !== undefined ) {
              this.collector[this.environment[i]] = response.data[0]
            } else {
              this.collector[this.environment[i]] = []
            }
          }).catch(e => {
            console.log(e)
            console.log(e.response)
          })
        }
      }
    }
  }

</script>

<style scoped>

</style>
