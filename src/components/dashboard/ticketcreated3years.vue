<template>
  <line-chart :chart-data="chartData" :options="options" :height="100"> </line-chart>
</template>

<script>
  import lineChart from './../charts/lineConfig'
  import chartOptions from './../../mixins/chartOptions'

  export default {
    components: {
      lineChart
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
        chooseColor: ["#ffe0b2", "rgb(243, 154, 155)", "rgb(169, 55, 144)", "rgb(48, 12, 70)"],
        options : {
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month',
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
        var dataset = []
        var label = []
        for (let i in this.data) {
          var content = {
                label: this.data[i]['Year'],
                borderColor: this.chooseColor[i],
                borderSize: 2,
                backgroundColor: 'transparent',
                data: []
          }
          for (let j in this.data[i]) {
            if (j === "Year") { // Remove Year
            } else {
              if (!this.isInArray(j, label)) { // Get the labels
                label.push(j)
              }
              content.data.push(this.data[i][j])  // Get the data
            }
          }
          dataset.push(content)
        }
        this.datacollection = {
          labels: label,
          datasets: dataset
        }
        return this.datacollection
      }
    }
  }
</script>
