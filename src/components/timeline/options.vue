<template>
  <app-level>
    <h1 class="title" slot="level-left">
      {{ timeline.title }}
    </h1>
    <p class="level-item heading" slot="level-right">
      Filter Via Category
    </p>
    <v-select :options="categories" label="name" slot="level-right" v-model="selected">
      <template slot="option" slot-scope="option">
        <span v-html="option.icon"></span> &nbsp;
        {{ option.name }}
      </template>
    </v-select>
  </app-level>
</template>

<script>
  import level from './../core/skeletons/level'
  export default {
    components: {
      'app-level': level
    },
    props: [
      'timeline', 'categories'
    ],
    data: function () {
      return {
        selected: ''
      }
    },
    watch: {
      'selected': function () {
        this.$emit('selectedCategory', this.selected)
      }
    }
  }
</script>
