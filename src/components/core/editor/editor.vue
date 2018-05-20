<!--Editor for making use of markdown data-->
<template>
  <section class="content">
    <div :class="{'container': !fullWidth}">
      <app-optionbar v-if="showButton"
                     :switches="switches"
                     v-on:save="save"
                     v-on:edit="edit"
                     v-on:preview="preview"
                     v-on:template="template"
                     v-on:clear="clear"
                     v-on:cancel="cancel">
        <div slot="left-bar">
          <slot name="slot-data"> </slot>
        </div>
      </app-optionbar>
      <app-markdown :switches="markdownSwitches"> </app-markdown>
      <section v-if="!markdownSwitches.show">
        <b-field>
          <b-input type="textarea" v-model="markdownSwitches.source" :rows="rows"></b-input>
        </b-field>
      </section>
    </div>
  </section>
</template>
<script>
  import markdown from './../skeletons/markdown'
  import optionbar from '../skeletons/buttonbar'

  export default {
    props: [
      'optionSwitch', 'url', 'source', 'rows', 'showButton', 'fullWidth', 'templateData'
    ],
    components: {
      'app-markdown': markdown,
      'app-optionbar': optionbar
    },
    data: function () {
      return {
        switches: this.optionSwitch,
      }
    },
    methods: {
      toggleSwitches: function () {
        for (let i in this.switches) {
          this.switches[i] = !this.switches[i]
        }
      },
      edit: function() {
        this.markdownSwitches.orginalSource = this.markdownSwitches.source
        this.markdownSwitches.show = !this.markdownSwitches.show
        this.toggleSwitches()
      },
      preview: function () {
        this.markdownSwitches.show = !this.markdownSwitches.show
        this.toggleSwitches()
      },
      template: function () {
        this.markdownSwitches.source = this.markdownSwitches.source + this.templateData
      },
      clear: function() {
        this.markdownSwitches.source = ""
      },
      cancel: function() {
        this.markdownSwitches.source = this.markdownSwitches.originalSource
        this.markdownSwitches.show = !this.markdownSwitches.show
        this.toggleSwitches()
      },
      save: function () {
        if (this.emptyData(this.markdownSwitches.source)) {
          this.notice(this.noContentPage, 'error', 'error')
          return false
        }
        this.markdownSwitches.show = !this.markdownSwitches.show
        this.toggleSwitches()
        return this.$emit('saveEdit', this.markdownSwitches.source)
      }
    },
    watch: {
      'source': function () {
        this.markdownSwitches.source = this.source
        this.markdownSwitches.originalSource = this.markdownSwitches.source
      },
    }
  }
</script>
