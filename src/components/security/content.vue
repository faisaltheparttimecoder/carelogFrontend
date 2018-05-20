<template>
  <section>
    <!--Filter bar-->
    <app-filter-bar :title="rssTitle"
                    :search.sync="search"
                    :showPageNumber = "true"
                    v-on:pageCount="tableCustomization.perPage = $event">
    </app-filter-bar>
    <!--Content table-->
    <app-table
      :search="search"
      :tableContent="rssContent"
      :pagecount="tableCustomization.perPage">
    </app-table>
  </section>
</template>

<script>
  import table from './table'
  import filterbar from './../core/skeletons/filterbar'
  export default {
    components: {
      'app-table': table,
      'app-filter-bar': filterbar
    },
    props: [
      'rssTitle', 'rssContent'
    ],
    data: function () {
      return {
        search: '',
        pagecount: ''
      }
    }
  }
</script>
