// Notification Mixin
// We use vue-snotify to control the notification
export default {
  // All snotify settings
  data: function () {
    return {
      timeout: 3000,
      notificationPosition: 'rightTop',
      progressBar: true,
      closeClick: true,
      newTop: true,
      backdrop: -1,
      dockMax: 8,
      blockMax: 6,
      pauseHover: true,
      titleMaxLength: 15,
      bodyMaxLength: 150
    }
  },
  methods: {
    // Setting up the defaults settings
    getConfig() {
      this.$snotify.setDefaults({
        global: {
          newOnTop: this.newTop,
          maxAtPosition: this.blockMax,
          maxOnScreen: this.dockMax,
        }
      })
      return {
        bodyMaxLength: this.bodyMaxLength,
        titleMaxLength: this.titleMaxLength,
        backdrop: this.backdrop,
        position: this.notificationPosition,
        timeout: this.timeout,
        showProgressBar: this.progressBar,
        closeOnClick: this.closeClick,
        pauseOnHover: this.pauseHover
      }
    },
    // Basic notification, the type includes
    // success, error, warning, info, simple
    notice(body, title, type) {
      this.$snotify[type](body, title, this.getConfig());
    },
    // Notification with HTML content on it
    htmlNotice(html) {
      this.$snotify.html(html, this.getConfig());
    },
  }
}
