<template>
  <div>
    <div class="level">
      <div class="level-item">
        <a v-if="!markdownSwitches.show"
           href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
          Markdown Cheat Sheet
        </a>
      </div>
      <div class="level-item">
        <a v-if="!markdownSwitches.show" href="https://www.tablesgenerator.com/markdown_tables" target="_blank">
          Xslx / csv to Markdown Table Generator
        </a>
      </div>
    </div>
    <vue-markdown :source="markdownSwitches.source"
                  :show="markdownSwitches.show"
                  :html="markdownSwitches.html"
                  :breaks="markdownSwitches.breaks"
                  :linkify="markdownSwitches.linkify"
                  :typographer="markdownSwitches.typographer">
    </vue-markdown>
  </div>
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
