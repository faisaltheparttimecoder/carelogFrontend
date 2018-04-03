<template>
  <div class="column is-4">
    <div class="box">
      <b-table
        :data="data"
        :narrowed="tableCustomization.isNarrowed"
        :striped="tableCustomization.isStriped"
        :loading="loading"
        default-sort="name"
        detailed
        detail-key="id">

        <template slot-scope="props">
          <!--Link text-->
          <b-table-column field="name" label="Links" sortable>
            <a target="_blank" :href="props.row.url">{{ props.row.name }}</a>
          </b-table-column>
          <b-table-column field="actions" label="Action">
            <p class="field">
              <!--Update button-->
              <a class="button is-small is-info is-outlined" v-on:click="editLinks({
                linkId: props.row.id, linkCategory: props.row.category_name,
                linkName: props.row.name, linkUrl: props.row.url, linkInfo: props.row.info})">
                <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
              </a>
              <!--Delete button-->
              <a class="button is-small is-danger is-outlined" v-on:click="confirmDelete(props.row.id)">
                <span class="icon is-small"> <i class="far fa-trash-alt"></i> </span>
              </a>
            </p>
          </b-table-column>
        </template>

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
  import customDefaults from './../../mixins/default'

  export default {
    mixins: [
      customDefaults
    ],
    props: [
      'data', 'loading'
    ],
    methods: {
      // call edit link handler when clicked
      editLinks: function (modalData) {
        return this.$emit('editLink', modalData)
      },
      // call delete link handler when clicked.
      deleteLink: function (linkId) {
        return this.$emit('deleteLink', linkId)
      },
      // Delete confirmation
      confirmDelete: function (id) {
        this.$dialog.confirm({
          title: 'Deleting Link',
          message: 'Are you sure you want to <b>delete</b> this link? <b>Please NOTE:</b> This action cannot be undone.',
          confirmText: 'Delete Link',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteLink(id)
        })
      }
    }
  }
</script>

<style scoped>
  td[data-label="Links"] {
    width: 73%
  }
</style>
