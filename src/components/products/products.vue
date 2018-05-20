<template>
  <!--The main product component-->
  <section class="section">

    <!--Spilt the container into two grids one half for menu and other for the content-->
    <div class="columns is-fullheight">
      <!--menu grid-->
      <div class="column is-2 is-sidebar-menu is-hidden-mobile">
        <app-menu :menuItems="menuItems" :selectedItem="selectedItem"
                  :menuTitle="menuTitle" :sourceUrl="sourceUrl"
                  :menuModification="false"
                  :sourceTitle="sourceTitle" :sourceInfo=true
                  v-on:refreshContent="clickedContent($event)">
        </app-menu>
      </div>
      <!--product content grid-->
      <div class="column is-10">
        <app-releases :productTitle="selectedItem"
                      :productContent="productContent">
        </app-releases>
      </div>
    </div>
  </section>
</template>

<script>
  import releases from './releases'
  export default {
    name: 'product',
    components: {
      'app-releases': releases
    },
    data() {
      return {
        menuTitle: 'Pivotal Products',   // This component default values
        sourceUrl: 'https://network.pivotal.io/',
        sourceTitle: 'Pivotal Network',
        menuItems: [],
        selectedItem: '',
        productContent: []              // The Contents of the pivotal products
      }
    },
    methods: {
      // Get all the contents of the rss feed.
      clickedContent: function (id) {
        this.get(this.api.product + id + '/').then(response => {
          this.selectedItem = response.name
          this.productContent = response.content.releases
        }).catch(error => {
          this.errorParser(this.productReleaseFailure, error)
        })
      },
    },
    // Attaching the lifecycle hook, to pull the API.
    created: function () {
      this.get(this.api.product).then(response => {
        this.menuItems = response
        if (!this.arrayEmpty(this.menuItems)) {
          this.clickedContent(this.menuItems[0]['id'])
        }
      }).catch(error => {
        this.errorParser(this.productLoadFailure, error)
      })
      this.$store.dispatch('activeNavbarAction', 'Products')
    }
  }
</script>

<style scoped>
  .columns.is-fullheight {
    min-height: calc(100vh - (3.25rem - .75rem));
    max-height: calc(100vh - (3.25rem - .75rem));
    display: flex;
    flex-direction: row;
    justify-content: stretch;
  }
  .columns.is-fullheight .column {
    overflow-y: auto;
  }
</style>
