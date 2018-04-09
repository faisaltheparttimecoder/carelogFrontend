<template>
  <bar-chart :chart-data="chartData" :options="options" :height="150"> </bar-chart>
</template>

<script>

  import barChart from './../charts/barConfig'
  import chartOptions from './../../mixins/chartOptions'

  export default {
    components: {
      barChart
    },
    props: [
      'data'
    ],
    mixins: [
      chartOptions
    ],
    data () {
      return {
        datacollection: null,
        options : {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Product Components',
                fontStyle: 'bold'
              },
              ticks: {
                callback: function(value, index, values) {
                  return value.split(/\n/);
                },
                autoSkip: true,
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Total Tickets',
                fontStyle: 'bold'
              },
              ticks: {
                callback: function(value, index, values) {
                  return parseFloat(value).toFixed(2);
                },
                autoSkip: true,
                beginAtZero: true,
                stepSize: 3
              }
            }]
          }
        }
      }
    },
    computed: {
      chartData: function() {
        this.datacollection = null
        var label = []
        var data = []
        for (let i in this.data) {
          label.push(this.formatComponentName(this.data[i].label))
          data.push(this.data[i].total)
        }
        this.datacollection =  {
          labels: label,
          datasets: [{
            label: "Product Components",
            backgroundColor: this.backgroundColor,
            data: data
          }]
        }
        return this.datacollection
      }
    }
  }

</script>
