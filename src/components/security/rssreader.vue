<template>

  <!--The main rssReader component-->
  <section class="section">

    <!--Spilt the container into two grids one half for menu and other for the content-->
    <div class="columns">

      <!--menu grid-->
      <div class="column is-2">
        <app-menu :menuItems="menuItems"
                  :selectedItem="selectedItem"
                  :menuTitle="menuTitle"
                  :sourceUrl="sourceUrl"
                  :sourceTitle="sourceTitle"
                  :sourceInfo=true
                  v-on:refreshContent="clickedContent($event)">
          <!--Extra contents for the menu-->
          <div slot="menuTop">
            <p class="menu-label has-text-weight-bold has-text-danger">
              Action
            </p>
            <div class="field" v-if="!menuFormActive">
              <p class="control">
                <a class="button is-success is-outlined" v-on:click="clearFormInputs">
                  <span class="icon is-small">
                    <i class="fas fa-rss-square"></i>
                  </span>
                  <span>Add RSS Source</span>
                </a>
              </p>
            </div>
            <form v-if="menuFormActive">
              <b-field>
                <b-input
                  type="text"
                  v-model="feedname"
                  placeholder="Enter feed name"
                  required>
                </b-input>
              </b-field>
              <b-field>
                <b-input
                  type="url"
                  v-model="feedurl"
                  placeholder="Enter feed URL"
                  required>
                </b-input>
              </b-field>
              <a class="button is-success is-outlined" @click="addNewFeed(feedname, feedurl)" > Add </a>
              <a class="button is-danger is-outlined" v-on:click="menuFormActive = false"> Cancel </a>
            </form>
          </div>
        </app-menu>
      </div>

      <!--rss content grid-->
      <div class="column is-10">
        <app-content :rssContent="rssContent" :rssTitle="selectedItem" :loading="loading"> </app-content>
      </div>

    </div>

  </section>

</template>

<script>
  // Import components
  import menu from '../core/menu'
  import content from './rsscontent'

  // Import mixins
  import helpers from './../../mixins/helper'
  import defaults from './../../mixins/default'

  // Package to convert data to Django string
  var qs = require('qs')

  export default {
    name: 'rssReader',

    // All Mixins
    mixins: [
      helpers, defaults
    ],

    // All the components to populate the content.
    components: {
      'app-menu': menu,
      'app-content': content,
    },

    // All data
    data: function() {
      return {
        // All this components default.
        menuTitle: 'Rss Feeder',
        sourceUrl: 'https://pivotal.io/security',
        sourceTitle: 'Security Page',

        // The content from the selected feeds
        rssContent: [],

        // Loading screen
        loading: false,

        // Form input field
        feedname: '',
        feedurl: '',
      }
    },

    // Extract the api data before create of vue instance
    created: function() {
      this.loading = true
      this.axios.get(this.api.security).then(response => {
        this.menuItems = response.data
        if (!this.arrayEmpty(this.menuItems)) {
          this.clickedContent(this.menuItems[0]['id'])
        }
        this.loading = false
      })
    },

    // All methods
    methods: {

      // Get all the contents of the rss feed.
      clickedContent: function(id) {
        this.loading = true
        this.axios.get(this.api.security + id + '/'). then(response => {
          this.selectedItem = response.data.name
          this.rssContent = response.data.content
          this.loading = false
        })
      },

      // Clear the form value
      clearFormInputs: function () {
        this.feedurl = ''
        this.feedname = ''
        this.menuFormActive = true
      },

      // This function is used when rss feed is added.
      addNewFeed: function(feedname, feedurl) {
        // Check of the fields have some data
        if (this.emptyData(feedname) || this.emptyData(feedurl) ) {
          this.emitMessage('ERROR: Fields are Blank, all fields are mandatory', 'is-danger' )
          return false
        }
        // Commit the data on the database.
        this.axios.post(this.api.security, qs.stringify({
          'name': feedname,
          'url': feedurl
        })).then(response => {
          if (response.statusText === 'Created' && response.status === 201) {
            this.menuItems.push(response.data)
            this.menuFormActive = false
            this.emitMessage('RSS Feeder Successfully Registered', 'is-success')
          } else {
            console.log(response)
            this.emitMessage('FAILURE: Link Update Unsuccessful, check browser console log', 'is-danger')
          }
        }).catch(error => {
          console.log(error)
          console.log(error.response.data)
          this.emitMessage("Failure: Check the browser console log for more information", 'is-danger')
        })
      },
    }
  }
</script>

<style>

</style>
