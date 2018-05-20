<!--Template to create a iframe to load the lifecycle matrix-->
<template>
  <section class="section">
    <iframe :src="sourceURL">
      Your browser doesn't support iframes
    </iframe>
  </section>
</template>

<script>
  export default {
    name: 'lifecycle',
    data: function () {
      return {
        sourceURL: 'https://d1fto35gcfffzn.cloudfront.net/support/PivotalLifecycleMatrix.pdf'
      }
    },
    created: function () {
      return this.$store.dispatch('activeNavbarAction', 'Life Cycle')
    }
  }
</script>

<style>
  iframe {
    display: block;
    border: none;
    height: 95vh;
    width: 97vw;
  }
</style>
