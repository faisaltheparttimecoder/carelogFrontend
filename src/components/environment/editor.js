var qs = require('qs')
export default {
  data: function() {
    return {
      markdownSwitches: {
        source: '',
        show: true,
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
        originalSource: ''
      },
      buttonDisable: {
        'add': true,
        'edit': true,
        'save': true,
        'preview': true,
        'template': true,
        'clear': true,
        'cancel': true,
      },
      tabs: [{
        label: 'Add',
        icon: 'fas fa-plus',
        action: 'add',
      }, {
        label: 'Edit',
        icon: 'fas fa-pencil-alt',
        action: 'edit',
      }, {
        label: 'Save',
        icon: 'far fa-save',
        action: 'save',
      }, {
        label: 'Preview',
        icon: 'fas fa-eye',
        action: 'preview',
      }, {
        label: 'Load Template',
        icon: 'fas fa-columns',
        action: 'template',
      }, {
        label: 'Clear',
        icon: 'fas fa-eraser',
        action: 'clear',
      }, {
        label: 'Cancel',
        icon: 'fas fa-ban',
        action: 'cancel',
      }],
    }
  },
  methods: {
    methodCaller: function(callMethod) { // Call the appropriate action on button click
      if (callMethod === 'add' && !this.buttonDisable.add) {
        this.toggleAllActionButtons()
        this.buttonDisable.add = true
        this.toggleEdit()
        this.markdownSwitches.source = this.sample
      } else if (callMethod === 'edit' && !this.buttonDisable.edit) {
        this.toggleAllActionButtons()
        this.toggleEdit()
        this.buttonDisable.edit = true
      } else if (callMethod === 'save' && !this.buttonDisable.save) {
        this.confirmSave()
      } else if (callMethod === 'preview' && !this.buttonDisable.preview) {
        this.toggleEdit()
        this.addOrEdit()
        this.toggleAllActionButtons()
      } else if (callMethod === 'template' && !this.buttonDisable.template) {
        this.markdownSwitches.source = this.sample
      } else if (callMethod === 'clear' && !this.buttonDisable.clear) {
        this.markdownSwitches.source = ""
      } else if (callMethod === 'cancel' && !this.buttonDisable.cancel) { // Load the original content before canceling
        this.toggleAllActionButtons()
        this.markdownSwitches.source = this.markdownSwitches.originalSource
        this.toggleEdit()
        this.addOrEdit()
      }
    },
    toggleEdit: function() { // Toggle b/w Edit View and Preview
      this.markdownSwitches.show =! this.markdownSwitches.show
    },
    loadEnvironment: function (event) {
      this.orgID = event.org_id;
      for (let i in this.environment) {
        this.axios.get(this.api.environment + this.environment[i] + '/?org_id=' + this.orgID ).then(response => {
          if (response.data.length > 0 ) {
            this.collector[this.environment[i]] = response.data
          } else {
            this.collector[this.environment[i]] = this.orginalCollector[this.environment[i]]
          }
        }).catch(e => {
          console.log(e)
          console.log(e.response)
        })
      }
    },
    saveAccountInformation: function () { // Save the information on database
      if (this.id === '') {
        this.axios.post(this.api.environment + this.subApi + '/', qs.stringify({
          org_id: this.orgID,
          updated: new Date(),
          info: this.markdownSwitches.source
        })).then(response => {
          this.toggleAllActionButtons()
          this.addOrEdit()
          this.markdownSwitches.originalSource = this.markdownSwitches.source
          this.updatedDate = response.data.updated
          this.toggleEdit()
          this.emitMessage("Environment Information Successfully Posted", 'is-success')
        }).catch(e => {
          this.emitMessage("Environment Information Creation Failed, Check the Browsers console log for more information", 'is-danger')
          console.log(e)
          console.log(e.response)
        })
      } else {
        this.axios.put(this.api.environment + this.subApi + '/' + this.id + '/', qs.stringify({
          org_id: this.orgID,
          updated: new Date(),
          info: this.markdownSwitches.source
        })).then(response => {
          this.toggleAllActionButtons()
          this.addOrEdit()
          this.markdownSwitches.originalSource = this.markdownSwitches.source
          this.updatedDate = response.data.updated
          this.toggleEdit()
          this.emitMessage("Environment Information Successfully Updated", 'is-success')
        }).catch(e => {
          this.emitMessage("Environment Information Update Failed, Check the Browsers console log for more information", 'is-danger')
          console.log(e)
          console.log(e.response)
        })
      }
    },
    addOrEdit: function() { // Based on the data is it a Add Or Edit
      if (this.id !== undefined || (this.markdownSwitches.source !== '' && this.markdownSwitches.source !== undefined) ) {
        this.buttonDisable.edit = false
      } else {
        this.buttonDisable.add = false
      }
    },
    toggleAllActionButtons: function() { // Activate all action button edit button click
      for (let i in this.buttonDisable) {
        if (i !== 'add' && i !== 'edit') {
          this.buttonDisable[i] = !this.buttonDisable[i]
        }
      }
    },
    confirmSave: function () {
      this.$dialog.confirm({
        title: 'Save',
        message: 'Are you sure you want to <b>save</b>?',
        confirmText: 'Save',
        type: 'is-success',
        hasIcon: true,
        onConfirm: () => this.saveAccountInformation()
      })
    },
  },
}
