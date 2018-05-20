<template>
  <app-editor-template :templateData="template"
                       :url="api.environment + 'contact_info/'"
                       :orgID="orgID">
  </app-editor-template>
</template>

<script>
  const sample = require('./template')
  import editorTemplate from './../pagetemplate'
  export default {
    components: {
      'app-editor-template': editorTemplate
    },
    props: [
      'orgID'
    ],
    data: function () {
      return {
        template: sample.contactSampleTemplate,
      }
    }
  }
</script>
