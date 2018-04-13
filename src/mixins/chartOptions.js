
export default {
  data: function () {
    return {
        chartColors: ['#845EC2','#D65DB1', '#FF6F91', '#FF9671', '#0081CF','#00C9A7',  '#FF8066', '#C34A36','#4B4453', '#983F65', '#D5CABD'],
      loading: true,
      dataEmpty: false,
      datacollection: null,
      legendPosition: 'bottom',
      toolbox: {
        feature: {
          saveAsImage: {
            title: "Save",
            name: "Carelog"
          }
        },
      }
    }
  },
  methods: {
    formatComponentName: function(str) {

      // If str contains "to be filled" then replace it with unknown
      if (str.startsWith("to_be_filled")) {
        str = "unknown"
      }

      // If there is a csr in the string then replace it with csr
      if (str.includes("csr")) {
        str = "csr"
      }

      // Replace underscores
      str = str.replace(/_/g, '\n')

      // replace pcf / gemfire / gpdb with blank
      str = str.replace('pcf\n', '').replace('gem\n', '').replace('gpdb\n', '')

      return str

    },
    isInArray: function(value, array) {
      return array.indexOf(value) > -1;
    }
  },
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
