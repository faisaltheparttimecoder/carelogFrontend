<template>
  <section class="section">
    <div class="columns">

      <div class="column is-2">
        <app-customer></app-customer>
      </div>

      <div class="column is-10">

      </div>

    </div>
  </section>

</template>

<script>
  import customer from './../customer/customer'
  import AppCustomer from "../customer/customer";
  export default {
    components: {
      'app-customer': customer
    }
  }

</script>

<style>

</style>
