<!--Boiler plate to be loaded when no content available-->
<template>
  <section class="container">
    <div class="has-text-centered is-vcentered">
      <i class="far fa-frown fa-4x"></i>
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
</style>
