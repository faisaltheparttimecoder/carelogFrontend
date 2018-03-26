<template>

  <!-- Main container -->
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <h1 class="title"> Tickets </h1>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <p class="level-item">FROM DATE: </p>
      <div class="level-item">
        <div class="field has-addons">
          <b-datepicker
            v-model="options.fromDate"
            placeholder="Click to select..."
            icon="calendar-today">
          </b-datepicker>
        </div>
      </div>
      <p class="level-item">END DATE: </p>
      <div class="level-item">
        <div class="field has-addons">
          <b-datepicker
            v-model="options.endDate"
            placeholder="Click to select..."
            icon="calendar-today">
          </b-datepicker>
        </div>
      </div>
      <p class="level-item"> PRIORITY: </p>
      <div class="level-item">
        <b-select
          v-model="options.priority"
          placeholder="Priority"
          icon="product-hunt"
          icon-pack="fab">
          <option value="all">All</option>
          <option value="urgent">S1</option>
          <option value="high">S2</option>
          <option value="normal">S3</option>
          <option value="low">S4</option>
        </b-select>
      </div>
      <p class="level-item"> Ex. CLOSED: </p>
      <div class="level-item">
        <b-switch v-model="options.excludeClosed" type="is-success"> </b-switch>
      </div>
      <p class="level-item">
        <a class="button is-success" v-on:click="refreshData">
          <span class="icon is-small">
            <i class="fas fa-sync-alt"></i>
          </span>
          <span>Refresh</span>
        </a>
      </p>
    </div>
  </nav>

</template>

<script>

  export default {
    props: [
      'options'
    ],
    methods: {
      // Send / emit the data to the root when refresh button is clicked.
      refreshData: function() {
        return this.$emit('refresh', {
          event: this.options,
          who: 'tableOptions'
        })
      }
    }
  }

</script>

<style>

</style>
