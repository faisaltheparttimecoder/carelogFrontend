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
            {{ productTitle }}
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
    <b-table :data="tableCustomization.isEmpty ? []:filterVersion" :paginated="tableCustomization.isPaginated"
             :per-page="tableCustomization.perPage" :current-page.sync="tableCustomization.currentPage"
             :pagination-simple="tableCustomization.isPaginationSimple"
             :narrowed="tableCustomization.isNarrowed" :striped="tableCustomization.isStriped" :loading="loading"
             :default-sort-direction="tableCustomization.defaultSortDirection" default-sort="release_date" detailed
             detail-key="version">

      <!--Table rows-->
      <template slot-scope="props">
        <b-table-column field="version" label="Version" sortable>
          {{ props.row.version }}
        </b-table-column>
        <b-table-column field="release_date" label="Release Date" sortable>
          {{ formatDate(props.row.release_date) }}
        </b-table-column>
        <b-table-column field="version" label="End of Support Date" sortable>
          {{ formatDate(props.row.end_of_support_date) }}
        </b-table-column>
        <b-table-column field="release_type" label="Release Type" sortable>
          {{ props.row.release_type }}
        </b-table-column>
      </template>

      <!--Table rows content-->
      <template slot="detail" slot-scope="props">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <ul class="subtitle is-6">
                <li v-html="'<strong>Version:</strong> ' + isUndefined(props.row.version)"></li>
                <li v-html="'<strong>Description:</strong> ' + isUndefined(props.row.description)"></li>
                <li v-html="'<strong>Release Type: </strong> ' + isUndefined(props.row.release_type)"></li>
                <li v-html="'<strong>Release Date: </strong> ' + formatDate(props.row.release_date)"></li>
                <li v-html="isAnchorUndefined(props.row.release_notes_url)"></li>
                <li v-html="'<strong>Availability: </strong> ' + isUndefined(props.row.availability)"></li>
                <li v-html="'<strong>End Of Support Date: </strong> ' + formatDate(props.row.end_of_support_date)"></li>
                <li
                  v-html="'<strong>End Of Guidance Date: </strong> ' + formatDate(props.row.end_of_guidance_date)"></li>
                <li v-html="'<strong>Updated At: </strong> ' + formatDate(props.row.updated_at)"></li>
                <li
                  v-html="'<strong>Software Files Updated At: </strong> ' + formatDate(props.row.software_files_updated_at)"></li>
              </ul>
            </div>
          </div>
        </article>
      </template>

      <!--If table is empty-->
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
    name: 'productRelease',
    // All global mixins
    mixins: [
      customDefaults, helpers
    ],
    // All props
    props: [
      'productTitle', 'productContent', 'loading'
    ],
    // This components data
    data: function () {
      return {
        contentSearch: '',
      }
    },
    // Computed propert
    computed: {
      // Use the filter to filter out the content based on user search.
      filterVersion: function () {
        return this.productContent.filter((releases) => {
          return releases.version.toLowerCase().includes(this.contentSearch.toLowerCase())
        })
      }
    },
    // All methods
    methods: {
      // Check if the data is undefined on that case send none
      isUndefined: function (data) {
        if (data == undefined) {
          return "None"
        } else {
          return data
        }
      },
      // Is it undefined Anchor
      isAnchorUndefined: function (data) {
        if (this.isUndefined(data) == 'None') {
          return "<strong>Release Note: </strong> None"
        } else {
          return "<strong>Release Note: </strong><a target='_blank' href='" + data + "'>RELEASE NOTES</a>"
        }
      },
      // Format date
      formatDate: function (data) {
        if (this.isUndefined(data) == 'None') {
          return 'None'
        } else {
          return this.dateFormat(data)
        }
      }
    }
  }
</script>

<style>
</style>
