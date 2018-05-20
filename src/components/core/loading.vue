<template>
  <app-page-loading v-if="loading"
    :animation-duration="speed"
    :size="size"
    :color="color"
    class="loading">
  </app-page-loading>
</template>

<script>
  import { SemipolarSpinner  } from 'epic-spinners'
  export default {
    components: {
      'app-page-loading': SemipolarSpinner
    },
    props: [
      'loading'
    ],
    data: function () {
     return {
       color: '#7957d5',
       size: 70,
       speed: 2000,
     }
    }
  }
</script>

<style scoped>
  .loading {
    position: fixed !important;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 30%;
    z-index: 9999;
  }
</style>
