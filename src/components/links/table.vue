<!--Table template for the links-->
<template>
  <div class="column is-4">
    <div class="box">
      <b-table
        :data="data"
        :narrowed="tableCustomization.isNarrowed"
        :striped="tableCustomization.isStriped"
        default-sort="name"
        detailed
        detail-key="id">
        <!--table rows template-->
        <template slot-scope="props">
          <!--Link text-->
          <b-table-column field="name" label="Links" sortable>
            <a target="_blank" :href="props.row.url">{{ props.row.name }}</a>
          </b-table-column>
          <b-table-column field="actions" label="Action">
            <p class="field">
              <!--Update button-->
              <a class="button is-small is-outlined" v-on:click="$emit('editLink', {id: props.row.id,
                                                                                category_id: props.row.category_id,
                                                                                category_name: props.row.category_name,
                                                                                url: props.row.url,
                                                                                name: props.row.name,
                                                                                info: props.row.info})">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
              </a>
              <!--Delete button-->
              <a class="button is-small is-outlined" v-on:click="$emit('deleteLink', props.row.id)">
                <span class="icon is-small">
                  <i class="far fa-trash-alt"></i>
                </span>
              </a>
            </p>
          </b-table-column>
        </template>
        <!--The reveal button template-->
        <template slot="detail" slot-scope="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <ul class="subtitle is-6">
                  <li v-html="'<strong>Title: </strong> ' + props.row.name"></li>
                  <li v-html="'<strong>URL: </strong> ' + props.row.url"></li>
                  <li v-html="'<strong>Category Type: </strong> ' + props.row.category_name"></li>
                  <li v-html="'<strong>Information: </strong> ' + props.row.info"></li>
                </ul>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'data'
    ],
  }
</script>

<style scoped>
  td[data-label="Links"] {
    width: 73%
  }
</style>
