<template>
  <!--The main product component-->
  <section class="section">
    <!--Spilt the container into two grids one half for menu and other for the content-->
    <div class="columns is-fullheight">
      <!--menu grid-->
      <div class="column is-2 is-sidebar-menu is-hidden-mobile">
        <app-menu
          :menuItems="filterProducts"
          :selectedItem="selectedItem"
          :menuTitle="menuTitle"
          :sourceUrl="sourceUrl"
          :sourceTitle="sourceTitle"
          v-on:refreshContent="clickedContent($event)">
          <div slot="menuTop">
            <p class="menu-label">
              Filter
            </p>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-rounded" v-model="productSearch" type="text" placeholder="Search Products">
                <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
              </p>
            </div>
          </div>
        </app-menu>
      </div>
      <!--product content grid-->
      <div class="column is-10">
        <app-releases> </app-releases>
      </div>
    </div>
  </section>
</template>

<script>
  import menu from '../core/menu'
  import releases from './productRelease'
  export default {
    name: 'product',
    components: {
      'app-menu': menu,
      'app-releases': releases
    },
    data() {
      return {
        menuTitle: 'Pivotal Products',
        sourceUrl: 'https://network.pivotal.io/',
        sourceTitle: 'Pivotal Network',
        productSearch: '',
      }
    },
    // Attaching the lifecycle hook, to pull the API.
    beforeCreate: function() {
      this.$store.dispatch('pullPivotalProducts', 0)
    },
    methods: {
      // Handle the emit handler to refresh the content
      clickedContent: function(id) {
        this.$store.dispatch('pullPivotalProducts', id)
      }
    },
    computed: {
      // pull all the menuItems from the store
      menuItems: function() {
        return this.$store.state.products.menuItems
      },
      // Record to what menu item was clicked
      selectedItem: function() {
        return this.$store.state.products.productTitle
      },
      // Is there any content to show
      contextExists: function() {
        return this.$store.state.products.productContentLength === 0
      },
      // Use the filter to filter out the content based on user search.
      filterProducts: function() {
        return this.menuItems.filter((product) => {
          return product.fields.name.toLowerCase().includes(this.productSearch.toLowerCase())
        })
      }
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
