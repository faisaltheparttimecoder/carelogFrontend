// This plugin is used to convert the data that can be read by Django Backend.
var qs = require('qs')

// All the functions that is need during form sumbit.
export default {
  methods: {
    // This function is used when rss feed is added.
    addNewFeed: function(feedname, feedurl) {
      this.axios.post(process.env.API_URL + 'security/post/', qs.stringify({
        'feedname': feedname,
        'feedurl': feedurl
      })).then(response => {
        this.closeModal()
        if (response.data.message === 'success') {
          var newItem = {
            id: response.data.id,
            item: feedname,
            route: feedurl
          }
          this.$store.dispatch('pullNewMenuItems', newItem)
          this.emitSuccessMessage('RSS Feeder Successfully Registered', 'is-success')
        } else {
          this.emitSuccessMessage('FAILURE: ' + response.data.message, 'is-danger')
        }
      }).catch(error => {
        console.log(error)
        this.emitSuccessMessage("Failure: Check the browser console log for more information", 'is-danger')
      })
    },
    // Close any modal if called.
    closeModal: function() {
      return this.$emit('close')
    },
    // Open up a snack bar for the message
    emitSuccessMessage: function(message, type) {
      return this.$toast.open({
        message: message,
        type: type,
        position: 'is-top',
        queue: false,
        duration: 3500
      })
    }
  }
}
