<template>
  <div>
    <div class="level">
      <div class="level-item">
        <a v-if="!markdownSwitches.show" class="button is-outlined is-info"
           href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
                <span class="icon is-small">
            <i class="fab fa-snapchat-ghost"></i>
          </span>
          <span>Markdown Cheat Sheet</span>
        </a>
      </div>
      <div class="level-item">
        <a v-if="!markdownSwitches.show" class="button is-outlined is-info"
           href="https://www.tablesgenerator.com/markdown_tables" target="_blank">
          <span class="icon is-small">
            <i class="fas fa-cogs"></i>
          </span>
          <span>Xslx / CSV to Markdown Table Generator</span>
        </a>
      </div>
      <div class="level-item">
        <a v-if="!markdownSwitches.show" class="button is-outlined is-info"
           href="https://drive.google.com/drive/u/1/folders/0B6WrGMuXFql9YnRxOUZFOGZEVU0" target="_blank">
          <span class="icon is-small">
            <i class="fab fa-google-drive"></i>
          </span>
          <span>Upload files to GDrive</span>
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
