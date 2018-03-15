<template>
  <!--Load this page if there is no content available for the rss feed-->
  <section class="container">
    <div class="has-text-centered is-vcentered">
      <i class="far fa-frown fa-6x"></i>
      <h1 class="title">..... Sorry .....</h1>
      <h2 class="subtitle">
        {{ message }}
      </h2>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'noContentTemplate',
    props: [
      'message'
    ]
  }
</script>

<style scoped>
  .is-vcentered {
    position: absolute;
    top: 50%;
    left: 10%;
  }
</style>
