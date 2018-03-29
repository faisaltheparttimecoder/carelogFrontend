<template>
  <section class="section">
    <div class="columns">
      <!--Load customer menu sidebar-->
      <div class="column is-2">
        <app-customer v-on:selectedOrg="loadTimeline($event)"> </app-customer>
      </div>
      <!--Load the timeline data-->
      <div class="column is-10">
        <div v-if="!isTimelineDetails">
          <app-options :customer="orgID" v-on:newTimeline="addTimeline($event)"> </app-options>
          <app-card :timelines="timeline"
                    :isTimeline="isTimeline"
                    v-on:isTimelineEmpty="isTimelineEmpty"
                    v-on:TimelineDetails="TimelineDetails($event)">
          </app-card>
        </div>
        <app-details v-if="isTimelineDetails"
                     :customer="orgID"
                     :timeline="timelineID"
                     :title="timelineTitle"
                     v-on:closeDetails="closeTimelineDetails">
        </app-details>
      </div>
    </div>
  </section>
</template>

<script>
  import customer from './../customer/customer'
  import timelineOptions from './timelineoptions'
  import timelineDetails from './timelinedetails'
  import card from './timelinecards'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'

  export default {
    components: {
      'app-customer': customer,
      'app-options': timelineOptions,
      'app-details': timelineDetails,
      'app-card': card
    },
    mixins: [
      defaults, helpers
    ],
    data: function() {
      return {
        customer: '',
        orgID: '',
        timeline: [],
        isTimeline: false,
        isTimelineDetails: false,
        timelineID: '',
        timelineTitle: ''
      }
    },
    methods: {
      loadTimeline: function(events) {
        this.isTimelineDetails = false
        this.customer = events.event
        this.orgID = events.org_id
        this.axios.get(this.api.timeline + '?org_id=' + this.orgID).then(response => {
          this.timeline = response.data
          this.isTimelineEmpty()
        })
      },
      addTimeline: function(event) {
        this.timeline.push(event)
        this.isTimelineEmpty()
      },
      isTimelineEmpty: function() {
        this.isTimeline = this.arrayEmpty(this.timeline)
      },
      TimelineDetails: function(event) {
        this.timelineID = event.id
        this.timelineTitle = event.name
        this.isTimelineDetails = true
      },
      closeTimelineDetails: function() {
        this.isTimelineDetails = false
      }
    }
  }

</script>

<style scoped>

</style>
