<template>
  <vue-markdown :source="markdownSwitches.source"
                :show="markdownSwitches.show"
                :html="markdownSwitches.html"
                :breaks="markdownSwitches.breaks"
                :linkify="markdownSwitches.linkify"
                :typographer="markdownSwitches.typographer">
  </vue-markdown>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    components: {
      'vue-markdown': VueMarkdown,
    },
    props: [
      'markdownSwitches'
    ]
  }
</script>
