<template>
  <!--The main product component-->
  <section class="section">

    <!--Spilt the container into two grids one half for menu and other for the content-->
    <div class="columns is-fullheight">

      <!--menu grid-->
      <div class="column is-2 is-sidebar-menu is-hidden-mobile">
        <app-menu
          :menuItems="menuItems"
          :selectedItem="selectedItem"
          :menuTitle="menuTitle"
          :sourceUrl="sourceUrl"
          :sourceTitle="sourceTitle"
          :sourceInfo=true
          v-on:refreshContent="clickedContent($event)">
        </app-menu>
      </div>

      <!--product content grid-->
      <div class="column is-10">
        <app-releases :productTitle="selectedItem" :productContent="productContent" :loading="loading"> </app-releases>
      </div>

    </div>

  </section>
</template>

<script>
  import menu from '../core/menu'
  import releases from './productrelease'
  import helpers from './../../mixins/helper'
  import defaults from './../../mixins/default'

  export default {
    name: 'product',

    components: {
      'app-menu': menu,
      'app-releases': releases
    },

    // All global mixins
    mixins: [
      helpers, defaults
    ],

    data() {
      return {
        // This component default values
        menuTitle: 'Pivotal Products',
        sourceUrl: 'https://network.pivotal.io/',
        sourceTitle: 'Pivotal Network',

        // table loading
        loading: false,

        // The Contents of the pivotal products
        productContent: []
      }
    },

    // Attaching the lifecycle hook, to pull the API.
    created: function() {
      this.loading = true
      this.axios.get(this.api.product).then(response => {
        this.menuItems = response.data
        if (!this.arrayEmpty(this.menuItems)) {
          this.clickedContent(this.menuItems[0]['id'])
        }
        this.loading = false
      })
    },

    methods: {
      // Get all the contents of the rss feed.
      clickedContent: function(id) {
        this.loading = true
        this.axios.get(this.api.product + id + '/'). then(response => {
          this.selectedItem = response.data.name
          this.productContent = response.data.content.releases
          this.loading = false
        })
      },
    }
  }
</script>

<style scoped>
  .columns.is-fullheight {
    min-height: calc(100vh - ( 3.25rem - .75rem ) );
    max-height: calc(100vh - ( 3.25rem - .75rem ) );
    display: flex;
    flex-direction: row;
    justify-content: stretch;
  }
  .columns.is-fullheight .column {
    overflow-y: auto;
  }
</style>
