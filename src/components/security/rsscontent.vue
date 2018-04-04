<template>
  <!--Rss feeder contents, for the different RSS URL-->
  <section class="section">

    <!--Bulma Level: https://bulma.io/documentation/layout/level/-->
    <nav class="level">

      <!--Left items of the level-->
      <div class="level-left">
        <div class="level-item">
          <!--Title of the feeder-->
          <h1 class="title">
            {{ rssTitle }}
          </h1>
        </div>
      </div>

      <!-- Right side of the level-->
      <div class="level-right">

        <!--Search bar-->
        <div class="level-item">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input is-rounded" v-model="contentSearch" type="text" placeholder="Search...">
              <span class="icon is-small is-left">
                <i class="fas fa-search"></i>
              </span>
            </p>
          </div>
        </div>

        <!--Show drop down to select number of entries from the table-->
        <p class="level-item">
          <strong>Per Page</strong>
        </p>
        <p class="level-item">
          <b-select v-model="tableCustomization.perPage" :disabled="!tableCustomization.isPaginated">
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </b-select>
        </p>

      </div>

    </nav>

    <!--Buefy Table: https://buefy.github.io/#/documentation/table-->
    <b-table
      :data="tableCustomization.isEmpty ? []:filterRssContent"
      :paginated="tableCustomization.isPaginated"
      :per-page="tableCustomization.perPage"
      :current-page.sync="tableCustomization.currentPage"
      :pagination-simple="tableCustomization.isPaginationSimple"
      :narrowed="tableCustomization.isNarrowed"
      :striped="tableCustomization.isStriped"
      :default-sort-direction="tableCustomization.defaultSortDirection"
      :loading="loading"
      detailed
      detail-key="title">

      <!--Table rows-->
      <template slot-scope="props">
        <b-table-column field="published" label="Published Date" width="250">
          {{ dateFormat(props.row.published) }}
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
            <p>Nothing here.</p>
          </div>
        </section>
      </template>

    </b-table>

  </section>
</template>

<script>
  import customDefaults from './../../mixins/default'
  import helpers from './../../mixins/helper'

  export default {
    name: 'rssReaderContents',
    // Global functions
    mixins: [
      customDefaults, helpers
    ],
    // Props
    props: [
      'rssTitle', 'rssContent', 'loading'
    ],
    // Most of the data below are to control the table flow.
    data: function () {
      return {
        contentSearch: ''
      }
    },
    computed: {
      // Use the filter to filter out the content based on user search.
      filterRssContent: function () {
        return this.rssContent.filter((rssContent) => {
          return rssContent.summary.toLowerCase().includes(this.contentSearch.toLowerCase())
        })
      }
    }
  }
</script>

<style scoped>
</style>
