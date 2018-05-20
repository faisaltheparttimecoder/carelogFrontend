<!--Buefy Table: https://buefy.github.io/#/documentation/table-->
<template>
  <b-table
    :data="tableCustomization.isEmpty ? []:filter(tableContent, 'version', search)"
    :paginated="tableCustomization.isPaginated"
    :per-page="pagecount"
    :current-page.sync="tableCustomization.currentPage"
    :pagination-simple="tableCustomization.isPaginationSimple"
    :narrowed="tableCustomization.isNarrowed"
    :striped="tableCustomization.isStriped"
    :default-sort-direction="tableCustomization.defaultSortDirection"
    :mobile-cards="tableCustomization.hasMobileCards"
    default-sort="release_date"
    detailed
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
          <p>{{ productNoContentMessage }}</p>
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
    methods: {
      // Is it undefined Anchor
      isAnchorUndefined: function (data) {
        if (this.isUndefined(data) === 'None') {
          return "<strong>Release Note: </strong> None"
        } else {
          return "<strong>Release Note: </strong><a target='_blank' href='" + data + "'>RELEASE NOTES</a>"
        }
      },
    }
  }
</script>
