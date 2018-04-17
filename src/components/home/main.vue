<template>

  <section class="section">
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
      </div>
      <!-- Right side -->
      <div class="level-right">
        <div class="level-item" v-if="markdownSwitches.show">
          <a class="button is-outlined" v-on:click="editPage">
          <span class="icon is-small">
            <i class="fas fa-pencil-alt"></i>
          </span>
            <span>Edit</span>
          </a>
        </div>
        <div class="level-item" v-if="!markdownSwitches.show">
          <a class="button is-outlined" @click="savePage">
          <span class="icon is-small">
            <i class="far fa-save"></i>
          </span>
            <span>Save</span>
          </a>
        </div>
        <div class="level-item" v-if="!markdownSwitches.show">
          <a class="button is-outlined" v-on:click="markdownSwitches.show = !markdownSwitches.show">
          <span class="icon is-small">
            <i class="fas fa-eye"></i>
          </span>
            <span>Preview</span>
          </a>
        </div>
        <div class="level-item" v-if="!markdownSwitches.show">
          <a class="button is-outlined" v-on:click="cancelEdit">
          <span class="icon is-small">
            <i class="fas fa-ban"></i>
          </span>
            <span>Cancel</span>
          </a>
        </div>
      </div>
    </nav>

    <section class="hero is-fullheight is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Business Critical Support
          </h1>
          <p></p>

          <section class="content">
            <vue-markdown :source="markdownSwitches.source"
                          :show="markdownSwitches.show"
                          :html="markdownSwitches.html"
                          :breaks="markdownSwitches.breaks"
                          :linkify="markdownSwitches.linkify"
                          :typographer="markdownSwitches.typographer">
            </vue-markdown>
          </section>

          <section v-if="!markdownSwitches.show">
            <b-field>
              <b-input type="textarea" v-model="markdownSwitches.source" rows="20"></b-input>
            </b-field>
            <br/>
          </section>

          <app-map> </app-map>

        </div>
      </div>
    </section>
  </section>

</template>

<script>
  import mapChart from './../charts/mapchart'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import VueMarkdown from 'vue-markdown'
  var qs = require('qs')

  export default {
    components: {
      'app-map': mapChart,
      'vue-markdown': VueMarkdown,
    },
    mixins: [
      defaults, helpers
    ],
    data: function () {
      return {
        id: '',
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
          page: 'main',
          content: this.markdownSwitches.source
        })).then(response => {
          this.markdownSwitches.source = response.data.content
          this.markdownSwitches.orginalSourcesource = this.markdownSwitches.source
          this.markdownSwitches.show = ! this.markdownSwitches.show
          this.emitMessage('Main Page has been successfully updated', 'is-success')
        }).catch(e => {
          this.emitMessage('Main Page updation failed', 'is-danger')
        })
      }
    },
    created: function () {

      this.axios.get(this.api.main + '?page=main').then(response => {
        if (response.data.length > 0) {
          this.id = response.data[0].id
          this.markdownSwitches.source = response.data[0].content
          this.markdownSwitches.orginalSource = this.markdownSwitches.source
        }
      })

      return this.$store.dispatch('activeNavbarAction', 'Main')
    }
  }
</script>


