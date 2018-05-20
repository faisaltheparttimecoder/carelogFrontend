<!--The timeline content page-->
<template>
  <div class="timeline">
    <!--Start tag-->
    <header class="timeline-header">
      <span class="tag is-large is-primary">End</span>
    </header>
    <!--Dummy item to get the line-->
    <div class="timeline-item">
    </div>
    <!--Time to loop through the timeline content-->
    <div v-for="(timelineContents, index) in convertArrayToObject">
      <!--The index string or the date-->
      <header class="timeline-header">
        <span class="subtitle"><strong>{{ timelineDateFormat(index, true) }}</strong></span>
      </header>
      <!--Timeline entries for those dates-->
      <div v-for="(timelineContent, index) in timelineContents"
           v-if="isThisVisible(timelineContent.category_id)"
           class="timeline-item"
           :class="timelineContent.category_color">
        <!--The colour / icon of the box , based on category-->
        <div class="timeline-marker is-image is-32x32 centerWrapper"
             :class="timelineContent.category_color"
             v-html="timelineContent.category_icon">
        </div>
        <!--the timeline contents-->
        <div class="timeline-content">
          <p class="heading">{{ timelineDateFormat(timelineContent.created, false) }}</p>
          <h4 class="title is-4"> {{ timelineContent.title }}</h4>
          <div class="content" style="margin-top: -3%">
            <app-markdown :switches="markdownData(timelineContent.description)"> </app-markdown>
          </div>
          <!--Buttons to manipulate the timeline content-->
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" v-on:click="$emit('updateContent',{
                                                          id: timelineContent.id,
                                                          category_id: timelineContent.category_id,
                                                          created: new Date(timelineContent.created),
                                                          title: timelineContent.title,
                                                          description: timelineContent.description
                                                        })">
                <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
              </a>
              <a class="level-item" v-on:click="confirmDelete(timelineContent.id, 'Timeline Content')">
                <span class="icon is-small"><i class="fas fa-trash"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!--End tag-->
    <header class="timeline-header">
      <span class="tag is-large  is-primary">Start</span>
    </header>
  </div>
</template>

<script>
  import 'bulma-timeline/dist/bulma-timeline.min.css'
  import markdown from './../core/skeletons/markdown'
  export default {
    components: {
      'app-markdown': markdown
    },
    props: [
      'timelineData', 'categoryFilter'
    ],
    methods: {
      // Turn on the visibility of the timeline data based on the filter selected.
      isThisVisible: function (id) {
        if (this.categoryFilter === '' || this.categoryFilter === null || this.categoryFilter.id === id) {
          return true
        } else {
          return false
        }
      },
      // Switches for the markdown data
      markdownData: function (data) {
        var content = this.deepCopyObject(this.markdownSwitches)
        content.source = data
        return content
      },
      // delete the data
      deleteData: function(id) {
        this.delete(this.api.timelineDetails + id + '/').then(response => {
          this.notice(this.timelineDataDeleteSuccess, 'success', 'success')
          this.$emit('deleteContent', id)
        }).catch(error => {
          this.errorParser(this.timelineDataDeleteFailure, error)
        })
      }
    },
    computed: {
      // Turn the data and sort them by date
      convertArrayToObject: function () {
        var collector = {}
        for (let el of this.timelineData) {
          var date = this.dateFormat(el.created, '/').substring(0, 7)
          if (collector[date] === undefined) {
            collector[date] = [el]
          } else {
            collector[date].push(el)
          }
        }
        return collector
      },
    }
  }
</script>
