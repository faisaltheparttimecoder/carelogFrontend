<template>
  <!-- Main container -->
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
    </div>
    <!-- Right side -->
    <div class="level-right">
      <div class="level-item" v-if="markdownSwitches.show">
        <a class="button is-outlined" v-on:click="$emit('editPage')">
          <span class="icon is-small">
            <i class="fas fa-pencil-alt"></i>
          </span>
          <span>Edit</span>
        </a>
      </div>
      <div class="level-item" v-if="!markdownSwitches.show">
        <a class="button is-outlined" v-on:click="$emit('savePage')">
          <span class="icon is-small">
            <i class="far fa-save"></i>
          </span>
          <span>Save</span>
        </a>
      </div>
      <div class="level-item" v-if="!markdownSwitches.show">
        <a class="button is-outlined"  v-on:click="$emit('preview')">
          <span class="icon is-small">
            <i class="fas fa-eye"></i>
          </span>
          <span>Preview</span>
        </a>
      </div>
      <div class="level-item" v-if="!markdownSwitches.show">
        <a class="button is-outlined" v-on:click="$emit('cancelEdit')">
          <span class="icon is-small">
            <i class="fas fa-ban"></i>
          </span>
          <span>Cancel</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    props: [
      'markdownSwitches'
    ]
  }
</script>
