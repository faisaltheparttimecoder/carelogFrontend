<!--Markdown editor template-->
<template>
  <div>
    <!--Markdown Helpers buttons-->
    <div class="level">
      <div class="level-item">
        <a v-if="!switches.show" class="button is-outlined"
           href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">
                <span class="icon is-small">
            <i class="fab fa-snapchat-ghost"></i>
          </span>
          <span>Markdown Cheat Sheet</span>
        </a>
      </div>
      <div class="level-item">
        <a v-if="!switches.show" class="button is-outlined"
           href="https://www.tablesgenerator.com/markdown_tables" target="_blank">
          <span class="icon is-small">
            <i class="fas fa-cogs"></i>
          </span>
          <span>Xslx / CSV to Markdown Table Generator</span>
        </a>
      </div>
      <div class="level-item">
        <a v-if="!switches.show" class="button is-outlined"
           href="https://drive.google.com/drive/u/1/folders/0B6WrGMuXFql9YnRxOUZFOGZEVU0" target="_blank">
          <span class="icon is-small">
            <i class="fab fa-google-drive"></i>
          </span>
          <span>Upload files to GDrive</span>
        </a>
      </div>
    </div>
    <!--Markdown editor-->
    <vue-markdown :source="switches.source"
                  :show="switches.show"
                  :html="switches.html"
                  :breaks="switches.breaks"
                  :linkify="switches.linkify"
                  :typographer="switches.typographer">
    </vue-markdown>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    components: {
      VueMarkdown,
    },
    props: [
      'switches'
    ]
  }
</script>
