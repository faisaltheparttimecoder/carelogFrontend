<template>
  <section>
    <app-banner :title=title :subtitle=subtitle>
      <button class="button is-outlined" v-on:click="showButton = !showButton" slot="banner-addon">
        <span class="icon is-small">
          <i class="fas fa-exchange-alt"></i>
        </span>
        <span>{{ showButton ? 'Hide' : 'Show' }} Options</span>
      </button>
    </app-banner>
    <app-editor :optionSwitch="switches"
                :fullWidth="false"
                :url="api.main"
                :rows="20"
                :showButton="showButton"
                :source="sourceData.content"
                v-on:saveEdit="confirmSave($event, 'Page')">
    </app-editor>
  </section>
</template>
<script>
  import banner from './../core/skeletons/banner'
  import editor from './../core/editor/editor'

  export default {
    components: {
      'app-banner': banner,
      'app-editor': editor
    },
    props: [
      'title', 'subtitle', 'pageName', 'navItem'
    ],
    data: function () {
      return {
        showButton: false,
        sourceData: {
          id: '',
          content: ''
        },
        switches: {
          save: false,
          edit: true,
          preview: false,
          clear: false,
          cancel: false,
        },
      }
    },
    methods: {
      saveData: function (data) {
        this.patch(this.api.main + this.sourceData.id + '/', {
          page: this.pageName,
          content: data
        }).then(response => {
          this.sourceData.content = response.content
          this.notice(this.pageUpdateSuccess, 'Success', 'success')
        }).catch(error => {
          this.errorParser(this.pageUpdateFailure, error)
        })
      }
    },
    created: function () {
      // Load the data for the page
      this.get(this.api.main +'?page=' + this.pageName).then(response => {
        if (!this.arrayEmpty(response)) {
          this.sourceData.id = response[0].id
          this.sourceData.content = response[0].content
        }
      }).catch(error => {
        this.errorParser(this.pageLoadFailure, error)
      })
      // Show active class for the page on the navbar
      return this.$store.dispatch('activeNavbarAction', this.navItem)
    }
  }
</script>
