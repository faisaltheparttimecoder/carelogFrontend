<template>
  <section>

    <!--All the options to edit this section-->
    <app-options :updatedDate="updatedDate"
                 :tabs="tabs"
                 :buttonDisable="buttonDisable"
                 v-on:methodCaller="methodCaller"> </app-options>

    <!--No Contents-->
    <app-nocontent v-if="!buttonDisable.add"
                   :message="'No Customer Overview Available, Click on the Add Button to Add One'">
    </app-nocontent>

    <!--First show the content-->
    <section v-else class="content">
      <app-markdown :markdownSwitches="markdownSwitches"> </app-markdown>
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

  const sample = require('./sampletemplate')
  import VueMarkdown from 'vue-markdown'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import noContent from './../core/nocontent'
  import markdownEditor from './../core/markdowneditor'
  import editorOptions from './editorOptions'
  import editor from './editor'

  export default {
    components: {
      'vue-markdown': VueMarkdown,
      'app-nocontent': noContent,
      'app-markdown': markdownEditor,
      'app-options': editorOptions,
    },
    mixins: [
      defaults, helpers, editor
    ],
    props: [
      'orgID', 'info'
    ],
    data: function() {
      return {
        id: '',
        updatedDate: '',
        sample: sample.sampleTemplate,
        subApi: 'account_info'
      }
    },
    watch: { // watch the info property and change the value based on the changes.
      'info': function() {
        if (this.info.id !== "" || this.info.id !== undefined ) {
          this.markdownSwitches.show = true
          this.id = this.info.id
          this.updatedDate = this.info.updated
          this.markdownSwitches.source = this.info.info
          this.markdownSwitches.originalSource = this.markdownSwitches.source
        } else {
          this.markdownSwitches.source = ""
        }

        // User changed the customer while the form or button was active
        // So now we cleanup the visbility
        if (!this.buttonDisable.save) {
          this.toggleAllActionButtons()
        }

        if (this.markdownSwitches.source === "") {
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
