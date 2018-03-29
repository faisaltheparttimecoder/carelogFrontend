<template>
  <nav class="level">
    <!-- Left side -->
    <div class="level-left">
      <h1 class="title"> Timeline </h1>
    </div>
    <!-- Right side -->
    <div class="level-right">
      <!--Form to add new timeline title-->
      <div class="level-item" v-if="addTimeline">
        <div class="level-item control has-icons-left has-icons-right">
          <input class="input" maxlength="30" type="text" placeholder="Timeline Title..." v-model="timelineTitle">
          <span class="icon is-small is-left">
            <i class="fas fa-clock"></i>
          </span>
        </div>
        <div class="level-item control has-icons-left has-icons-right">
          <input class="input" maxlength="300" type="text" placeholder="Timeline Description..." v-model="timelineDesc">
          <span class="icon is-small is-left">
            <i class="fas fa-book"></i>
          </span>
        </div>
        <p class="level-item">
          <a class="button is-success" v-on:click="registerTimeline"> ADD </a>
        </p>
      </div>
      <!--Add new timeline button-->
      <p class="level-item" v-if="!addTimeline">
        <a class="button is-success" v-on:click="addTimeline = true">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>New Timeline</span>
        </a>
      </p>
    </div>
  </nav>
</template>

<script>
  var qs = require('qs')
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  export default {
    mixins: [
      defaults, helpers
    ],
    props: [
      'customer'
    ],
    data: function () {
      return {
        addTimeline: false,
        timelineTitle: '',
        timelineDesc: ''
      }
    },
    methods: {
      registerTimeline: function() {
        if (this.emptyData(this.timelineTitle) || this.emptyData(this.timelineDesc)) {
          this.emitMessage("ERROR: All fields are mandatory", "is-danger")
          return false
        }
        this.axios.post(this.api.timeline, qs.stringify({
          title: this.timelineTitle,
          description: this.timelineDesc,
          org_id: this.customer
        })).then(response => {
          this.timelineTitle = ''
          this.timelineDesc = ''
          this.addTimeline = false
          this.emitMessage("New timeline successfully created", 'is-success')
          return this.$emit('newTimeline', response.data)
        }).catch(error => {
          console.log(error)
          console.log(error.response)
          this.emitMessage("ERROR: Couldn't create timeline, see browser console log for more information", 'is-danger')
        })
      }
    }
  }
</script>
