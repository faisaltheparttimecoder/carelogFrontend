
export default {
  data: function () {
    return {
      backgroundColor: [
        "#ffe0b2", "rgb(249, 199, 168)", "rgb(243, 154, 155)",
        "rgb(236, 110, 141)", "rgb(215, 74, 136)",
        "rgb(169, 55, 144)", "rgb(123, 35, 151)",
        "rgb(92, 24, 134)", "rgb(70, 18, 102)",
        "rgb(48, 12, 70)"
      ]
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
  }
}
