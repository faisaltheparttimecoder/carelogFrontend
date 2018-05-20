<template>
  <!--Level bar -->
  <app-level>
    <div class="level-item" slot="level-left">
      <h1 class="title">
        {{ title }}
      </h1>
    </div>
    <!--Search bar-->
    <div class="level-item" slot="level-right">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input is-rounded" type="text" placeholder="Search..." v-model="search">
          <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
        </p>
      </div>
    </div>
    <!--Show drop down to select number of entries from the table-->
    <p class="level-item" slot="level-right" v-if="showPageNumber">
      <strong>Per Page</strong>
    </p>
    <p class="level-item" slot="level-right" v-if="showPageNumber">
      <b-select v-model="tableCustomization.perPage">
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </b-select>
    </p>
    <p class="level-item" slot="level-right" v-if="showButton">
      <a class="button is-outlined" v-on:click="$emit('add')">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
        <span>{{ buttonName }}</span>
      </a>
    </p>
  </app-level>
</template>

<script>
  import level from './level'
  export default {
    props: [
      'title', 'showPageNumber', 'showButton', 'buttonName'
    ],
    components: {
      'app-level': level
    },
    data: function () {
      return {
        search: '',
      }
    },
    watch: {
      'search': function () {
        this.$emit('update:search', this.search)
      },
      'tableCustomization.perPage': function () {
        this.$emit('pageCount', this.tableCustomization.perPage)
      }
    }
  }
</script>
