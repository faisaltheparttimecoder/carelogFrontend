<template>
    <pie-chart :chart-data="chartData" :height="315"> </pie-chart>
</template>

<script>

  import pieChart from './../charts/pieConfig'
  import chartOptions from './../../mixins/chartOptions'

  export default {
    components: {
      pieChart
    },
    props: [
      'data'
    ],
    mixins: [
      chartOptions
    ],
    data () {
      return {
        datacollection: null
      }
    },
    computed: {
      chartData: function() {
        this.datacollection = null
        var label = []
        var data = []
        for (let i in this.data) {
          label.push(this.data[i].label)
          data.push(this.data[i].total)
        }
        this.datacollection =  {
          labels: label,
            datasets: [{
              backgroundColor: this.backgroundColor,
              data: data
          }]
        }
        return this.datacollection
      }
    }
  }

</script>
