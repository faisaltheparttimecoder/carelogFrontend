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
        chooseColor: ["#ffe0b2", "rgb(243, 154, 155)", "rgb(169, 55, 144)"],
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
            label: this.data[i]['status'],
            backgroundColor: this.chooseColor[i],
            data: []
          }
          for (let j in this.data[i]) {
            if (j === "status") { // Remove Status
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
