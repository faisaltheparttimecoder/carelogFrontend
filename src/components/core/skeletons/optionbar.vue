<!--Option Bar template, that store all the buttons flow-->
<template>
  <app-level>
    <!-- Left side -->
    <h1 class="title" slot="level-left">
      {{ title }}
    </h1>
    <div class="level-item" slot="level-right">
      <p>FROM DATE: </p>
    </div>
    <div class="level-item" slot="level-right">
      <div class="field has-addons">
        <b-datepicker
          v-model="options.fromDate"
          placeholder="Select From Date..."
          icon="calendar-today">
        </b-datepicker>
      </div>
    </div>
    <div class="level-item" slot="level-right">
      <p>END DATE: </p>
    </div>
    <div class="level-item" slot="level-right">
      <div class="field has-addons">
        <b-datepicker
          v-model="options.endDate"
          placeholder="Select End Date..."
          icon="calendar-today">
        </b-datepicker>
      </div>
    </div>
    <div class="level-item" v-if="switches.priority" slot="level-right">
      <p> PRIORITY: </p>
    </div>
    <div class="level-item" v-if="switches.priority" slot="level-right">
      <div class="field has-addons">
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
    </div>
    <div class="level-item" v-if="switches.closed" slot="level-right">
      <p> Ex. CLOSED: </p>
    </div>
    <div class="level-item" v-if="switches.closed" slot="level-right">
      <b-switch v-model="options.excludeClosed" type="is-success"></b-switch>
    </div>
    <div class="level-item" slot="level-right">
      <a class="button is-outlined" @click="$emit('refresh')">
          <span class="icon is-small">
            <i class="fas fa-sync-alt"></i>
          </span>
        <span>Refresh</span>
      </a>
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
      'title', 'switches', 'options'
    ]
  }
</script>
