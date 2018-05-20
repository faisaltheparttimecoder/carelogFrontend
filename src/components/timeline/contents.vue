<!--Timeline content page-->
<template>
  <section>
    <!--Floating button-->
    <app-floating-buttons @closeDetails="$emit('closeDetails')"
                          v-if="showDetails">
    </app-floating-buttons>
    <!--Option bar-->
    <app-timeline-options @selectedCategory="categoryFilter = $event"
                          :timeline="timeline"
                          :categories="categories">
    </app-timeline-options>
    <div class="columns">
      <!--The timeline contents-->
      <div class="column is-8">
        <!--No data-->
        <app-no-contents v-if="arrayEmpty(timelineData)"
                         :message="noTimelineDataMessage">
        </app-no-contents>
        <!--Detail Page-->
        <app-timeline-details v-else
                              @updateContent="updateTimelineContent = $event"
                              @deleteContent="loadTimeLineData"
                              :categoryFilter="categoryFilter"
                              :timelineData="timelineData">
        </app-timeline-details>
      </div>
      <!--Timeline form-->
      <div class="column is-4">
        <app-timeline-form :categories="categories"
                           :timeline="timeline"
                           :updateTimelineContent="updateTimelineContent"
                           @modified="loadTimeLineData">
        </app-timeline-form>
      </div>
    </div>
  </section>
</template>

<script>
  import floatingButton from './../core/skeletons/floatingbutton'
  import form from './form'
  import options from './options'
  import details from './details'
  export default {
    components: {
      'app-floating-buttons': floatingButton,
      'app-timeline-form': form,
      'app-timeline-options': options,
      'app-timeline-details': details
    },
    props: [
      'showDetails', 'timeline', 'categories'
    ],
    data: function () {
      return {
        timelineData: [],
        categoryFilter: '',
        updateTimelineContent: {}
      }
    },
    methods: {
      // Load the timeline data based
      loadTimeLineData: function () {
        this.get(this.api.timelineDetails + '?org_id=' +
          this.timeline.org_id + '&timeline_id=' +
          this.timeline.id).then(response => {
            this.timelineData = response
        }).catch(error => {
          this.errorParser(this.timelineDataLoadFailure, error)
        })
      },
    },
    mounted: function () {
      this.loadTimeLineData()
    },
  }
</script>
