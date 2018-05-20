export default {
  // Global Chart options
  data: function () {
    return {
      chartColors: ['#845EC2','#D65DB1', '#FF6F91',
        '#FF9671', '#0081CF','#00C9A7',
        '#FF8066', '#C34A36','#4B4453',
        '#983F65', '#D5CABD'],            // Color control
      loading: true,                      // Show loading
      dataEmpty: false,                   // Data empty
      datacollection: null,               // Data Collector
      legendPosition: 'bottom',           // Legend Position, options top, left, right, bottom
      toolbox: {                          // Chart toolbox
        feature: {
          saveAsImage: {
            title: "Save",
            name: "Carelog"
          }
        },
      }
    }
  },
  // Convert the data to echart data format
  computed: {
    chartData: function () {
      this.loading = true
      this.dataEmpty = false
      this.datacollection = {
        columns: ['label', 'total'],
        rows: this.data
      }
      this.loading = false
      if (this.datacollection.rows.length === 0) {
        this.dataEmpty = true
      }
      return this.datacollection
    }
  }
}
