<template>

  <section class="section">

    <app-options
      :markdownSwitches="markdownSwitches"
      v-on:editPage="editPage"
      v-on:savePage="savePage"
      v-on:preview="markdownSwitches.show = !markdownSwitches.show"
      v-on:cancelEdit="cancelEdit">
    </app-options>

    <section class="hero is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Engaging & Pricing of Businsess Critical Service
          </h1>
          <br/>
          <section class="content">
            <app-editor :markdownSwitches="markdownSwitches"> </app-editor>
          </section>
          <section v-if="!markdownSwitches.show">
            <b-field>
              <b-input type="textarea" v-model="markdownSwitches.source" rows="20"> </b-input>
            </b-field>
            <br/>
          </section>

        </div>
      </div>
    </section>
  </section>

</template>

<script>
  import mapChart from './../charts/mapchart'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import options from './mainoptions'
  import editor from './editor.js'
  import markdownEditor from '../core/markdowneditor'

  export default {
    components: {
      'app-map': mapChart,
      'app-options': options,
      'app-editor': markdownEditor,
    },
    mixins: [
      defaults, helpers, editor
    ],
    data: function () {
      return {
        id: '',
        page: 'engagement'
      }
    },
    created: function () {
      this.axios.get(this.api.main + '?page=' + this.page).then(response => {
        if (response.data.length > 0) {
          this.id = response.data[0].id
          this.markdownSwitches.source = response.data[0].content
          this.markdownSwitches.originalSource = this.markdownSwitches.source
        }
      })
      return this.$store.dispatch('activeNavbarAction', 'Engagement & Pricing')
    }
  }
</script>


