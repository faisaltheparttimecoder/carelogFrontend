<template>
  <!--Buefy Table: https://buefy.github.io/#/documentation/table-->
  <b-table
    :data="tableCustomization.isEmpty ? []:filter(tableContent, 'summary', search)"
    :paginated="tableCustomization.isPaginated"
    :per-page="pagecount"
    :current-page.sync="tableCustomization.currentPage"
    :pagination-simple="tableCustomization.isPaginationSimple"
    :narrowed="tableCustomization.isNarrowed"
    :striped="tableCustomization.isStriped"
    :default-sort-direction="tableCustomization.defaultSortDirection"
    :mobile-cards="tableCustomization.hasMobileCards"
    detailed
    detail-key="title">

    <!--Table rows-->
    <template slot-scope="props">
      <b-table-column field="published" label="Published Date" width="250">
        {{ formatDate(props.row.published, false) }}
      </b-table-column>
      <b-table-column field="title" label="Vulnerability">
        {{ props.row.title }}
      </b-table-column>
    </template>

    <!--Table rows content-->
    <template slot="detail" slot-scope="props">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p v-html="props.row.summary">
            </p>
          </div>
        </div>
      </article>
    </template>

    <!-- Empty table-->
    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large">
            </b-icon>
          </p>
          <p>{{ rssNoContentMessage }}</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
  export default {
    props: [
      'tableContent', 'search', 'pagecount'
    ],
  }
</script>
