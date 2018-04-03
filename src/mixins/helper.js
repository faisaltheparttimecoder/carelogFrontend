// All the functions that is need during form sumbit.
export default {

  methods: {
    // Open up a snack bar for the message
    emitMessage: function (message, type) {
      return this.$toast.open({
        message: message,
        type: type,
        position: 'is-top',
        queue: false,
        duration: 3500
      })
    },

    // Date Formatter
    dateFormat: function (data) {
      var date = new Date(data)
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      return year + '-' + month + '-' + day;
    },

    // Trim leading and trailing spaces on the form
    trimSpaces: function (data) {
      return data.trim()
    },

    // is the data empty
    emptyData: function (data) {
      if (this.trimSpaces(data) === "") {
        return true
      } else {
        return false
      }
    },

    // Slice Array into multiple slice
    arraySlicer: function (arr, sliceNo) {
      var slicedArr = [];
      for (var i in arr) {
        if ((i) % 3 === sliceNo) {
          slicedArr.push(arr[i])
        }
      }
      return slicedArr
    },

    // Is array length empty
    arrayEmpty: function (arr) {
      if (arr.length === 0) {
        return true
      } else {
        return false
      }
    },

    // Get the dict using the key.
    getValueOfKey: function (arrObjects, keyObjects) {
      for (let element of arrObjects) {
        if (element.name === keyObjects) {
          return element.id
        }
      }
      return ''
    },

    // Provide the index where the dict is on the array based on row ID
    getObjectIndex: function (arrObjects, id) {
      return arrObjects.map(function (item) {
        return item.id;
      }).indexOf(id);
    },

    // Get date based on number of months
    monthAgo: function (d, n) {
      return new Date(d.setMonth(d.getMonth() - n))
    },

    // Replace a string escapes to HTML tags
    replaceStringToHtml: function (str) {
      return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },

    // Convert first alphabet to upper case
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  }
}
