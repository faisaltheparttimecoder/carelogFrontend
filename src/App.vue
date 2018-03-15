<template>
  <!--The main template, that would be used by all the components-->
  <div id="app">
    <!--All the template would have the navbar, so adding it here-->
    <app-navbar> </app-navbar>
    <!--Based on the router link clicked upload the specific component-->
    <router-view/>
  </div>
</template>

<script>
  import navbar from './components/core/navbar'
  export default {
    name: 'App',
    components: {
      'app-navbar': navbar
    }
  }
</script>

<style>
</style>
