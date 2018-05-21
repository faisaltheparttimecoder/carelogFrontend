<template>
  <div>
    <app-tile :data="chunkData(filter(data, 'description', search, 'title'), 2)"
              :showDetail="true"
              :showDate="true"
              @edit="$emit('edit', {id: $event.id,
                                    title: $event.title,
                                    description: $event.description,
                                    created: $event.created,
                                    updated: $event.updated})"
              @delete="$emit('delete', $event)"
              @detail="$emit('detail', $event)">
      <template slot-scope="props">
        <p class="title">
          <a v-on:click="$emit('detail', props.content.id)"> {{props.content.title}} </a>
        </p>
        <p class="content">
          <app-markdown :switches="updateSource(props.content.description)"> </app-markdown>
        </p>
      </template>
    </app-tile>
  </div>
</template>

<script>
  import tile from '../skeletons/tile'
  import markdown from '../skeletons/markdown'
  export default {
    props: [
      'data', 'search'
    ],
    components: {
      'app-markdown': markdown,
      'app-tile': tile
    },
    methods: {
      updateSource: function (sourceData) {
        var source = this.deepCopyObject(this.markdownSwitches)
        source.source = this.snippet(sourceData, 350)
        return source
      }
    }
  }
</script>

<style scoped>
  .content {
    opacity: .8;
  }
</style>
