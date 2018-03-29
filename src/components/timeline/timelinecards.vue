<template>
  <section class="section">
    <!--if there is timelines-->
    <div v-if="!isTimeline" >
      <div class="columns" v-for="timelines in chunkedTimelines">
        <div v-for="timeline in timelines" class="column">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title subtitle has-text-primary">
                {{ timeline.title }}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                {{ timeline.description }}
                <br><br>
                <p><strong>Created: </strong> {{ timeline.created | moment("ddd, MMMM Do YYYY") }}</p>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" v-on:click="TimelineDetails({
                                                       id: timeline.id,
                                                       name: timeline.title})">
                View Details</a>
              <a class="card-footer-item" v-on:click="confirmCustomDelete(timeline.id)" >Delete</a>
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

  export default  {
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
      deleteTimeline: function(timeline) {
        this.axios.delete(this.api.timeline + timeline + '/').then(response => {
          var index = this.getObjectIndex(this.timelines, timeline)
          this.timelines.splice(index, 1)
          return this.$emit('isTimelineEmpty')
        })
      },
      TimelineDetails: function(id) {
        return this.$emit('TimelineDetails', id)
      },
      confirmCustomDelete(timeline) {
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
