<!--Main page of BCS-->
<template>
  <section>
    <app-page-template title="Business Critical Support"
                       subtitle="Customer success with Pivotal products"
                       pageName="main" navItem="Main">
    </app-page-template>
    <app-map> </app-map>
  </section>
</template>
<script>
  import map from '../../charts/map'
  import pageTemplate from '../pagetemplate'
  export default {
    components: {
      'app-map': map,
      'app-page-template': pageTemplate
    },
  }
</script>
