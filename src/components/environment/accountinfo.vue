<template>
  <section>

    <nav class="level">
      <div class="level-left">
        <a v-if="!buttonDisable.save" class="button is-outlined"
           href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
          Markdown Cheat Sheet
        </a>
      </div>
      <div class="level-right">
        <div class="field has-addons">
          <p class="control" v-for="tab in tabs">
            <a class="button" v-on:click="methodCaller(tab.action)" :disabled="buttonDisable[tab.action]">
              <span class="icon is-small">
                <i :class="tab.icon"></i>
              </span>
              <span>{{ tab.label }}</span>
            </a>
          </p>
        </div>
      </div>
    </nav>

    <app-nocontent v-if="!buttonDisable.add"
                   :message="'No Customer Overview Available, Click on the Add Button to Add One'">
    </app-nocontent>

    <!--First show the content-->
    <section v-else class="content">
      <vue-markdown :source="markdownSwitches.source"
                    :show="markdownSwitches.show"
                    :html="markdownSwitches.html"
                    :breaks="markdownSwitches.breaks"
                    :linkify="markdownSwitches.linkify"
                    :typographer="markdownSwitches.typographer">
      </vue-markdown>
    </section>

    <!--If the user clicks on edit disply this below-->
    <section v-if="!markdownSwitches.show">
      <b-field>
        <b-input type="textarea" v-model="markdownSwitches.source" rows="100"></b-input>
      </b-field>
    </section>

  </section>
</template>

<script>

  import VueMarkdown from 'vue-markdown'
  const sample = require('./sampletemplate')
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import noContent from './../core/nocontent'
  var qs = require('qs')

  export default {
    components: {
      'vue-markdown': VueMarkdown,
      'app-nocontent': noContent
    },
    mixins: [
      defaults, helpers
    ],
    props: [
      'orgID', 'info'
    ],
    data: function() {
      return {
        accountInfoID: '',
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
          this.markdownSwitches.source = sample.sampleTemplate
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
          this.markdownSwitches.source = sample.sampleTemplate
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
      saveAccountInformation: function () { // Save the information on database
        if (this.accountInfoID === undefined) {
          this.axios.post(this.api.environment + 'account_info/', qs.stringify({
              org_id: this.orgID,
              info: this.markdownSwitches.source
          })).then(response => {
            this.toggleAllActionButtons()
            this.addOrEdit()
            this.markdownSwitches.originalSource = this.markdownSwitches.source
            this.toggleEdit()
            this.emitMessage("Customer Acoount Information Successfully Posted", 'is-success')
          }).catch(e => {
            this.emitMessage("Customer Acoount Information Creation Failed, Check the Browsers console log for more infromation", 'is-danger')
            console.log(e)
            console.log(e.response)
          })
        } else {
          this.axios.put(this.api.environment + 'account_info/' + this.accountInfoID + '/', qs.stringify({
              org_id: this.orgID,
              info: this.markdownSwitches.source
          })).then(response => {
            this.toggleAllActionButtons()
            this.addOrEdit()
            this.markdownSwitches.originalSource = this.markdownSwitches.source
            this.toggleEdit()
            this.emitMessage("Customer Acoount Information Successfully Updated", 'is-success')
          }).catch(e => {
            this.emitMessage("Customer Acoount Information Update Failed, Check the Browsers console log for more infromation", 'is-danger')
            console.log(e)
            console.log(e.response)
          })
        }
      },
      addOrEdit: function() { // Based on the data is it a Add Or Edit
        if (this.accountInfoID !== undefined || (this.markdownSwitches.source !== '' && this.markdownSwitches.source !== undefined) ) {
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
    watch: { // watch the info property and change the value based on the changes.
      'info': function() {
        this.markdownSwitches.show = true
        this.accountInfoID = this.info.id
        this.markdownSwitches.source = this.info.info
        this.markdownSwitches.originalSource = this.markdownSwitches.source

        // User changed the customer while the form or button was active
        // So now we cleanup the visbility
        if (!this.buttonDisable.save) {
          this.toggleAllActionButtons()
        }
        if (this.markdownSwitches.source === undefined) {
          this.buttonDisable.add = false
          this.buttonDisable.edit = true
        } else {
          this.buttonDisable.edit = false
          this.buttonDisable.add = true
        }
      }
    }
  }

</script>
