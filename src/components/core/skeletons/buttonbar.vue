<!--Option Bar template, that store all the buttons flow-->
<template>
  <app-level>
    <div slot="level-left">
      <slot name="left-bar"> </slot>
    </div>
    <div class="level-item" v-if="switches.add" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('add')">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
        <span>Add</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.edit" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('edit')">
          <span class="icon is-small">
            <i class="fas fa-pencil-alt"></i>
          </span>
        <span>Edit</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.save" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('save')">
          <span class="icon is-small">
            <i class="fas fa-save"></i>
          </span>
        <span>Save</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.preview" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('preview')">
          <span class="icon is-small">
            <i class="fas fa-eye"></i>
          </span>
        <span>Preview</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.template" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('template')">
          <span class="icon is-small">
            <i class="fas fa-columns"></i>
          </span>
        <span>Template</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.refresh" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('refresh')">
          <span class="icon is-small">
            <i class="fas fa-sync-alt"></i>
          </span>
        <span>Refresh</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.clear" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('clear')">
          <span class="icon is-small">
            <i class="fas fa-eraser"></i>
          </span>
        <span>Clear</span>
      </a>
    </div>
    <div class="level-item" v-if="switches.cancel" slot="level-right">
      <a class="button is-outlined" v-on:click="$emit('cancel')">
          <span class="icon is-small">
            <i class="fas fa-ban"></i>
          </span>
        <span>Cancel</span>
      </a>
    </div>
    <div slot="level-right">
      <slot name="custom-button"> </slot>
    </div>
    <div slot="level-right">
      &nbsp;&nbsp;&nbsp;
    </div>
    <div slot="level-right">
      <slot name="custom-button2"> </slot>
    </div>
  </app-level>
</template>

<script>
  import level from './level'
  export default {
    components: {
      'app-level': level
    },
    props: [
      'switches', 'title'
    ]
  }
</script>
