<template>
  <section>
    <!--Floating button-->
    <app-floating-buttons @closeDetails="$emit('closeDetails', sourceData)" v-if="showDetail"> </app-floating-buttons>
    <!--The Editor-->
    <app-editor :optionSwitch="switches"
                :fullWidth="true"
                :rows="100"
                :showButton="showDetail"
                :source="sourceData.description"
                v-on:saveEdit="confirmSave($event, 'Notes')">
      <h1 slot="slot-data"> {{ note.title }}</h1>
    </app-editor>
  </section>
</template>
<script>
  import editor from './../../core/editor/editor'
  import floatingButton from './../../core/skeletons/floatingbutton'
  export default {
    components: {
      'app-editor': editor,
      'app-floating-buttons': floatingButton
    },
    props: [
      'note', 'showDetail'
    ],
    data: function () {
      return {
        sourceData: {
          created: '',
          description: '',
          id: '',
          org_id: '',
          title: '',
          updated: ''
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
      saveData: function (event) {
        this.patch(this.api.environment + 'environment_notes/' + this.sourceData.id + '/', {
          description: event,
          org_id: this.sourceData.org_id,
          title: this.sourceData.title
        }).then(response => {
          this.sourceData = response
          this.notice(this.noteContentUpdateSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.noteContentUpdateFailure, error)
        })
      }
    },
    mounted: function () {
      this.sourceData = this.note
    }
  }
</script>
