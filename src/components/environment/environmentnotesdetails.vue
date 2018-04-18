<template>
  <div>
    <nav class="level">
      <div class="level-left">
      </div>
      <div class="level-right">
        <div class="level-item" v-if="!markdownSwitches.show">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-outlined" v-on:click="saveDetails">
                <span class="icon is-small">
                  <i class="fas fa-save"></i>
                </span>
                <span>Save</span>
              </a>
            </p>
          </div>
        </div>
        <div class="level-item" v-if="markdownSwitches.show">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-outlined" v-on:click="$emit('editNote')">
                <span class="icon is-small">
                  <i class="fas fa-pencil-alt"></i>
                </span>
                <span>Edit</span>
              </a>
            </p>
          </div>
        </div>
        <div class="level-item" v-if="!markdownSwitches.show">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-outlined" v-on:click="$emit('previewNote')">
                <span class="icon is-small">
                  <i class="fas fa-eye"></i>
                </span>
                <span>Preview</span>
              </a>
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-outlined" @click="$emit('showDetails')">
              <span class="icon is-small">
                <i class="fas fa-times"></i>
              </span>
                <span>close</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </nav>
    <div class="content">
      <app-markdown :markdownSwitches="markdownSwitches"> </app-markdown>

      <!--If the user clicks on edit disply this below-->
      <section v-if="!markdownSwitches.show">
        <b-field>
          <b-input type="textarea" v-model="markdownSwitches.source" rows="100"> </b-input>
        </b-field>
      </section>
    </div>
  </div>

</template>

<script>

  var qs = require('qs')
  import markdownEditor from './../core/markdowneditor'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'

  export default {
    props: [
      'markdownSwitches', 'noteDetails'
    ],
    mixins: [
      defaults, helpers
    ],
    components: {
      'app-markdown': markdownEditor
    },
    methods: {
      saveDetails: function () {
        this.axios.put(this.api.environment + this.noteDetails.sub_api + '/' + this.noteDetails.id + '/', qs.stringify({
          title: this.noteDetails.title,
          org_id: this.noteDetails.org_id,
          updated: new Date(),
          info: this.markdownSwitches.source
        })).then(response => {
          this.$emit('updatedNotes', response.data, this.noteDetails.id)
          this.emitMessage("Successfully updated the environment notes", 'is-success')
        }).catch(e => {
          console.log(e)
          console.log(e.response)
          this.emitMessage("Failure in updating the environment notes", 'is-danger')
        })
      }
    }
  }

</script>
