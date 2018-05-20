<!--Pie Charts components-->
<template>
  <div>
    <ve-pie :data="chartData"
            :colors="chartColors"
            :legend-position="legendPosition"
            :toolbox="toolbox"
            :loading="loading"
            :settings="chartSettings">
      <div class="data-empty" v-if="dataEmpty">
        <app-no-contents :message="noChartDataMessage"> </app-no-contents>
      </div>
    </ve-pie>
  </div>
</template>
<script>
  import chartOptions from '../core/utilities/chartOptions'
  export default {
    props: [
      'data'
    ],
    mixins: [
      chartOptions
    ],
    data () {
      return {
        chartSettings: {
          // roseType: 'radius',
          selectedMode: 'single',
        },
      }
    },
  }
</script>
