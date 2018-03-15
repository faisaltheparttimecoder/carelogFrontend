<template>
  <div>
    <!--Rss feeder contents, for the different RSS URL-->
    <section class="section">
      <!--Bulma Level: https://bulma.io/documentation/layout/level/-->
      <nav class="level">
        <!--Left items of the level-->
        <div class="level-left">
          <div class="level-item">
            <!--Title of the feeder-->
            <h1 class="title">
              {{ getProductTitle }}
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
        :data="filterVersion"
        :opened-detailed="defaultOpenedDetails"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :narrowed="isNarrowed"
        detailed
        detail-key="version">
        <!--Table rows-->
        <template slot-scope="props">
          <b-table-column label="Release Date">
            {{ props.row.release_date}}
          </b-table-column>
          <b-table-column label="Version">
            {{ props.row.version}}
          </b-table-column>
          <b-table-column label="Release Type">
            {{ props.row.release_type}}
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
                  <li v-html="'<strong>Release Date: </strong> ' + isUndefined(props.row.release_date)"></li>
                  <li v-html="isAnchorUndefined(props.row.release_notes_url)"></li>
                  <li v-html="'<strong>Availability: </strong> ' + isUndefined(props.row.availability)"></li>
                  <li v-html="'<strong>End Of Support Date: </strong> ' + isUndefined(props.row.end_of_support_date)"></li>
                  <li v-html="'<strong>End Of Guidance Date: </strong> ' + isUndefined(props.row.end_of_guidance_date)"></li>
                  <li v-html="'<strong>Updated At: </strong> ' + formatDate(props.row.updated_at)"></li>
                  <li v-html="'<strong>Software Files Updated At: </strong> ' + formatDate(props.row.software_files_updated_at)"></li>
                </ul>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'productRelease',
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
    computed: {
      // Get the rss title from the Vuex Store
      getProductTitle: function() {
        return this.$store.state.products.productTitle
      },
      // Get all the product content
      getProductContent: function() {
        return this.$store.state.products.productContent
      },
      // Use the filter to filter out the content based on user search.
      filterVersion: function() {
        return this.getProductContent.filter((releases) => {
          return releases.version.toLowerCase().includes(this.contentSearch.toLowerCase())
        })
      }
    },
    methods: {
      // Check if the data is undefined on that case send none
      isUndefined: function(data) {
        if (data == undefined) {
          return "None"
        } else {
          return data
        }
      },
      // Is it undefined Anchor
      isAnchorUndefined: function(data) {
        if (this.isUndefined(data) == 'None') {
          return "<strong>Release Note: </strong> None"
        } else {
          return "<strong>Release Note: </strong><a target='_blank' href='"+data+"'>RELEASE NOTES</a>"
        }
      },
      // Format date
      formatDate: function(data) {
        if(this.isUndefined(data) == 'None') {
          return 'None'
        } else {
          var date = new Date(data)
          var year = date.getFullYear();
          var month = (1 + date.getMonth()).toString();
          month = month.length > 1 ? month : '0' + month;
          var day = date.getDate().toString();
          day = day.length > 1 ? day : '0' + day;
          return year + '-' + month + '-' + day;
        }
      }
    }
  }
</script>

<style>
</style>
