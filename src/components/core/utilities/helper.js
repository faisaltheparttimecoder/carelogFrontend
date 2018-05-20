// Mixins the brings some common used methods
var chunk = require('chunk')
import moment from 'moment'
export default {
  methods: {
    // Format the error message for any error.
    errorParser: function (msg, error) {
      console.log("%c------------- ERROR -------------",
        "background: red; color: white; font-size: x-large");
      if (error.response === undefined) { // if the error is from the backend
        console.log(error)
      } else { // If the error is related to data being send to the database
        console.log(error.response.data)
      }
      this.notice(msg, 'Error', 'error')
    },
    // Confirmation for saving or delete.
    confirmSave: function(data, title) {
      this.$dialog.confirm({
        title: 'Saving ' + title,
        message: 'Are you sure you want to <b>save</b> and proceed with these changes?',
        confirmText: 'Save ' + title,
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.saveData(data)
      })
    },
    confirmDelete: function(data, title) {
      this.$dialog.confirm({
        title: 'Deleting ' + title,
        message: 'Are you sure you want to <b>delete</b>? This action cannot be undone.',
        confirmText: 'Delete ' + title,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.deleteData(data)
      })
    },
    // toggle the loading screen
    toggleLoading: function(action) {
      this.$store.dispatch('toggleLoadingAction', action)
    },
    // Trim leading and trailing spaces of the data
    trimSpaces: function (data) {
      return data.trim()
    },
    // is the data empty
    emptyData: function (data) {
      if (data === undefined) { // if the field is undefined, the its empty
        return true
      }
      if (this.trimSpaces(data) === "") {
        return true
      } else {
        return false
      }
    },
    // Is array length empty
    arrayEmpty: function (arr) {
      if (arr.length === 0) {
        return true
      } else {
        return false
      }
    },
    // Check if the object is empty
    objectEmpty: function (obj) {
      if (Object.keys(obj).length === 0) {
        return true
      } else {
        return false
      }
    },
    // Get the data and store them on a array based on the keyword
    arrByKeyword: function (arr, key, keyword) {
      var temp = []
      for (let i in arr) {
        if (arr[i][key] === keyword) {
          temp.push(arr[i])
        }
      }
      return temp
    },
    // Chunk Array (i.e split array based on a number)
    chunkData: function (arr, chunkNo) {
      return chunk(arr, chunkNo)
    },
    // Convert first alphabet letter to upper case
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    // Provide the index where the dict is on the array based on row ID
    getObjectIndex: function (arrObjects, id) {
      return arrObjects.map(function (item) {
        return item.id;
      }).indexOf(id);
    },
    // Provide the index on the element in the array
    getArrayIndex: function(arr, elem) {
      return arr.indexOf(elem)
    },
    // Delete or Remove elements from the array.
    removeElement: function (arr, element) {
      arr.splice(this.getObjectIndex(arr, element), 1)
      return arr
    },
    // Update array, i.e remove old element and push a new one
    updateElement: function (arr, element, newElement) {
      var index = this.getObjectIndex(arr, element)
      if (~index) {
        arr[index] = newElement
      }
      return arr
    },
    // Use the filter to filter out the content based on user search.
    filter: function (array, field, search, field2) {
      if (this.isUndefinedBool(field2)) {
        return array.filter((item) => {
          return item[field].toLowerCase().includes(search.toLowerCase()) || item[field2].toLowerCase().includes(search.toLowerCase())
        })
      } else {
        return array.filter((item) => {
          return item[field].toLowerCase().includes(search.toLowerCase())
        })
      }
    },
    // Check if the data is undefined on that case send none
    isUndefined: function (data) {
      if (data === undefined) {
        return "None"
      } else {
        return data
      }
    },
    // Is Undefined Boolean
    isUndefinedBool: function (data) {
      if (this.isUndefined === 'None') {
        return false
      } else {
        return data
      }
    },
    // Format the date as per the carelog format
    formatDate: function(string, withTime) {
      if (this.isUndefined(string) === 'None') {
        return 'None'
      } else {
        if (withTime) {
          return moment(String(string)).format('ddd, MMMM Do YYYY HH:MM:ss Z')
        } else {
          return moment(String(string)).format('YYYY/MM/DD')
        }
      }
    },
    // Get date based on number of months
    monthAgo: function (n) {
      return moment().subtract(n, 'months').format('YYYY/MM/DD')
    },
    // Date Formatter, on dashboard the moment keeps throwing warning messages
    // for now let us JS way of formatting to prevent the warning message
    dateFormat: function (data, partitionFormat) {
      var date = new Date(data)
      var year = date.getFullYear()
      var month = (1 + date.getMonth()).toString()
      month = month.length > 1 ? month : '0' + month
      var day = date.getDate().toString()
      day = day.length > 1 ? day : '0' + day
      return year + partitionFormat + month + partitionFormat + day
    },
    // Format for timeline dates
    timelineDateFormat: function (d, heading) {
      if(heading) {
        return moment(String(d)).format('MMM, YYYY')
      } else {
        return moment(String(d)).format('DD MMMM, YYYY')
      }
    },
    // If the page is loaded or deleted pick from the list of menu
    pickMenuItem: function (arr) {
      if (this.arrayEmpty(arr)) {
        return ''
      } else {
        return arr[0]['id']
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
    // Trim Data based on start and end value
    trimData: function (data, start, end) {
      if (data !== null) {
        if (end === null) {
          return data.slice(start,)
        } else {
          return data.slice(start, end)
        }
      }
    },
    // Replace a string escapes to HTML tags
    replaceStringToHtml: function (str) {
      return str.replace(/(?:\r\n|\r|\n)/g, '<br />')
    },
    // Deep copy of the object
    deepCopyObject: function (oldObj) {
      var newObj = oldObj;
      if (oldObj && typeof oldObj === 'object') {
        newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
        for (var i in oldObj) {
          newObj[i] = this.deepCopyObject(oldObj[i]);
        }
      }
      return newObj;
    },
    // Snippet of data based on the value passed on
    snippet: function (data, end) {
      return data.slice(0, end) + ' ......'
    }
  }
}
