
var qs = require('qs')
export default {
  data: function () {
    return {
      // Markdown options
      markdownSwitches: {
        source: '',
        show: true,
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
        originalSource: ''
      },
    }
  },
  methods: {
    cancelEdit: function() {
      this.markdownSwitches.source = this.markdownSwitches.originalSource
      this.markdownSwitches.show = !this.markdownSwitches.show
    },
    editPage: function() {
      this.markdownSwitches.orginalSource = this.markdownSwitches.source
      this.markdownSwitches.show = !this.markdownSwitches.show
    },
    savePage: function() {
      this.axios.put(this.api.main + this.id + '/', qs.stringify({
        page: this.page,
        content: this.markdownSwitches.source
      })).then(response => {
        this.markdownSwitches.source = response.data.content
        this.markdownSwitches.originalSource = this.markdownSwitches.source
        this.markdownSwitches.show = ! this.markdownSwitches.show
        this.emitMessage('Page has been successfully updated', 'is-success')
      }).catch(e => {
        this.emitMessage('Page updating failed', 'is-danger')
      })
    }
  },
}
