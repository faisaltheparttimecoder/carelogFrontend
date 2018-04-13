<template>
  <ve-funnel  :data="chartData"
              :colors="chartColors"
              :legend-position="legendPosition"
              :toolbox="toolbox"
              :loading="loading"
              :settings="chartSettings">
    <div class="data-empty" v-if="dataEmpty">
      <app-nocontent :message="'No data available'">
      </app-nocontent>
    </div>
  </ve-funnel>
</template>

<script>

  import noContent from '../core/nocontent'
  import chartOptions from '../../mixins/chartOptions'

  export default {
    props: [
      'data'
    ],
    mixins: [
      chartOptions
    ],
    components: {
      'app-nocontent': noContent,
    },
    data () {
      return {
        chartSettings: {
          ascending: true
        }
      }
    },
  }

</script>
