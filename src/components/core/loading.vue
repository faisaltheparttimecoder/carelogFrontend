<template>
  <app-dot-loading :loading="loading" :color="color" :size="size" class="loading"> </app-dot-loading>
</template>

<script>
  import DotLoader from 'vue-spinner/src/DotLoader.vue'
  export default {
    components: {
      'app-dot-loading': DotLoader
    },
    props: [
      'loading'
    ],
    data: function () {
      return {
        color: '#7957d5',
        size: '100px',
      }
    }
  }
</script>

<style scoped>
  .loading {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    z-index: 9999;
  }
</style>
