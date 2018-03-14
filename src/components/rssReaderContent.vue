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
            {{ getRssTitle }}
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
          <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </b-select>
        </p>
      </div>
    </nav>
    <!--Buefy Table: https://buefy.github.io/#/documentation/table-->
    <b-table
      :data="filterRssContent"
      :opened-detailed="defaultOpenedDetails"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :narrowed="isNarrowed"
      detailed
      detail-key="title"
      @details-open="(row, index) => $toast.open(`Expanded ${row.title}`)">
      <!--Table rows-->
      <template slot-scope="props">
        <b-table-column label="Date" width="250">
          {{ props.row.published | moment("dddd, MMMM Do YYYY")  }}
        </b-table-column>
        <b-table-column label="Vulnerability">
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
    </b-table>
  </section>
</template>

<script>
  export default {
    // Most of the data below are to control the table flow.
    data: function() {
      return {
        contentSearch: '',
        defaultOpenedDetails: [1],
        isPaginated: true,
        isPaginationSimple: true,
        currentPage: 1,
        perPage: 15,
        isNarrowed: true
      }
    },
    // Attaching the lifecycle hook, to pull the API.
    beforeCreate: function() {
      this.$store.dispatch('pullRssContent', 0)
    },
    computed: {
      // Get the rss Content from the Vuex Store
      getRssContent: function() {
        return this.$store.state.security.rssContent
      },
      // Get the rss title from the Vuex Store
      getRssTitle: function() {
        return this.$store.state.security.rssTitle
      },
      // Use the filter to filter out the content based on user search.
      filterRssContent: function() {
        return this.getRssContent.filter((rssContent) => {
          return rssContent.summary.toLowerCase().includes(this.contentSearch.toLowerCase())
        })
      }
    }
  }
</script>

<style scoped>
</style>
