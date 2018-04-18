<template>
  <nav class="level">
    <div class="level-left">
      <p class="heading"><strong>Last Updated:</strong> {{ updatedDate | moment('MMMM, DD YYYY HH:MM:ss Z') }} </p>
    </div>
    <div class="level-right">
      <div class="field has-addons">
        <p class="control" v-for="tab in tabs">
          <a class="button" v-on:click="$emit('methodCaller',tab.action)" :disabled="buttonDisable[tab.action]">
              <span class="icon is-small">
                <i :class="tab.icon"></i>
              </span>
            <span>{{ tab.label }}</span>
          </a>
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    props: [
      'tabs', 'buttonDisable', 'updatedDate'
    ],
  }
</script>
