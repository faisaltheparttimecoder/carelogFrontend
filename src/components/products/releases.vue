<template>
  <!--Rss feeder contents, for the different RSS URL-->
  <section>
    <!--Filter bar-->
    <app-filter-bar :title="productTitle"
                    :search.sync="search"
                    :showPageNumber = "true"
                    v-on:pageCount="tableCustomization.perPage = $event">
    </app-filter-bar>
    <!--Content table-->
    <app-table
      :search="search"
      :tableContent="productContent"
      :pagecount="tableCustomization.perPage">
    </app-table>
  </section>
</template>

<script>
  import table from './table'
  import filterbar from './../core/skeletons/filterbar'
  export default {
    name: 'productRelease',
    props: [
      'productTitle', 'productContent'
    ],
    components: {
      'app-table': table,
      'app-filter-bar': filterbar
    },
    data: function () {
      return {
        search: '',
        pagecount: ''
      }
    },
  }
</script>

<style>
</style>
