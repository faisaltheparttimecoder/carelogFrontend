<template>
  <!--The main rssReader component-->
  <section class="section">
    <!--Spilt the container into two grids one half for menu and other for the content-->
    <div class="columns">
      <!--menu grid-->
      <div class="column is-2">
        <app-menu :menuItems="menuItems" :selectedItem="selectedItem" v-on:openModal="newFeederModal">
        </app-menu>
      </div>
      <!--If there is no content then load this template-->
      <app-nocontent v-if="contextExists"> </app-nocontent>
      <!--rss content grid-->
      <div v-else class="column is-10">
        <app-content> </app-content>
      </div>
    </div>
  </section>
</template>

<script>
  // Import components
  import menu from './rssMenu'
  import content from './rssReaderContent'
  import noContent from './noContentMessage'

  // Import mixins
  import sumbitForm from '../mixins/sumbitForm'

  // Modal template to add a new feed
  // https://buefy.github.io/#/documentation/modal
  const rssReaderModal = {
    // All mixins functions.
    mixins: [
      sumbitForm
    ],
    // All the data for this components.
    data: function() {
      return {
        'feedname': '',
        'feedurl': '',
      }
    },
    template: `
            <form @submit.prevent="addNewFeed(feedname, feedurl)">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Enter RSS Feeder Information</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Feed Name">
                            <b-input
                                type="text"
                                v-model="feedname"
                                placeholder="Enter feed name"
                                required>
                            </b-input>
                        </b-field>
                        <b-field label="Feed URL">
                            <b-input
                                type="url"
                                v-model="feedurl"
                                placeholder="Enter feed URL"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success">Sumbit</button>
                        <button class="button is-danger" type="button" @click="$parent.close()">Close</button>
                    </footer>
                </div>
            </form>
        `
  }

  export default {
    name: 'rssReader',
    // All the components to populate the content.
    components: {
      'app-menu': menu,
      'app-content': content,
      'app-nocontent': noContent
    },
    data: function() {
      return {
        'editfeedname': 'aaa'
      }
    },
    computed: {
      // Pull all the menuItems from the vuex store
      menuItems: function() {
          return this.$store.state.security.menuItems
        },
      // Record to what menu item was clicked
      selectedItem: function() {
          return this.$store.state.security.rssTitle
        },
      // Is there any content to show
      contextExists: function() {
        return this.$store.state.security.rssContentLength === 0
      }
    },
    methods: {
      // Open the modal when the add new feed is clicked.
      newFeederModal() {
        this.$modal.open({
          parent: this,
          component: rssReaderModal,
          hasModalCard: true,
        })
      },
    }
  }
</script>

<style scoped>
</style>
