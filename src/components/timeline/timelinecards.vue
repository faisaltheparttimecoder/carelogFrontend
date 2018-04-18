<template>
  <section class="section">
    <!--if there is timelines-->
    <div v-if="!isTimeline">
      <div class="columns" v-for="timelines in chunkedTimelines">
        <div v-for="timeline in timelines" class="column">
          <div class="card">
            <div class="card-content">
              <p class="title"> {{ timeline.title }} </p>
              <div class="content"> {{ timeline.description }} </div>
              <p class="heading"> <strong> created: </strong>{{ timeline.created | moment("ddd, MMMM Do YYYY HH:MM:ss Z") }}</p>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" v-on:click="TimelineDetails({
                                                       id: timeline.id,
                                                       name: timeline.title})"> Details </a>
              <a class="card-footer-item" v-on:click="confirmCustomDelete(timeline.id)">Delete</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <!--if there are no timelines-->
    <div v-else>
      <app-nocontent :message="'No timeline content available, try adding a new timeline.'">
      </app-nocontent>
    </div>
  </section>
</template>

<script>
  var chunk = require('chunk')
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import noContent from './../core/nocontent'

  export default {
    props: [
      'timelines', 'isTimeline'
    ],
    components: {
      'app-nocontent': noContent
    },
    mixins: [
      helpers, defaults
    ],
    computed: {
      chunkedTimelines() {
        return chunk(this.timelines, 3)
      }
    },
    methods: {
      deleteTimeline: function (timeline) {
        this.axios.delete(this.api.timeline + timeline + '/').then(response => {
          var index = this.getObjectIndex(this.timelines, timeline)
          this.timelines.splice(index, 1)
          return this.$emit('isTimelineEmpty')
        })
      },
      TimelineDetails: function (id) {
        return this.$emit('TimelineDetails', id)
      },
      confirmCustomDelete: function(timeline) {
        this.$dialog.confirm({
          title: 'Deleting Timeline',
          message: 'Are you sure you want to <b>delete</b> this timeline? This action cannot be undone.',
          confirmText: 'Delete Timeline',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteTimeline(timeline)
        })
      }
    }
  }

</script>

<style>

</style>
