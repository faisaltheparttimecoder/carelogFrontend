<template>
  <div>
    <!-- Options -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="title">
            {{ title }}
          </p>
        </div>
      </div>
      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          Filter Via Category
        </p>
        <p class="level-item">
          <div class="control has-icons-left">
            <div class="select">
              <select v-model="choosenCategory">
                <option value="0" selected>All</option>
                <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div class="icon is-small is-left">
              <i class="fas fa-globe"></i>
            </div>
          </div>
        </p>
        <p class="level-item">
          <a class="button is-outlined" v-on:click="toggleForm = !toggleForm">Toggle Activity Form</a>
        </p>
      </div>
    </nav>

    <section class="section">
      <!--Floating button to close the page-->
      <a v-on:click="closeDetails" class="float">
        <i class="fas fa-times my-float"></i>
      </a>

      <div class="columns">
        <!--If no data available request user to add it-->
        <app-nocontent v-if="noContent"
                       :message="'No data available, add some activity using the form.'">
        </app-nocontent>
        <!--else show the data-->
        <div v-else class="column is-8">
          <div class="timeline">
            <!--Start tag-->
            <header class="timeline-header">
              <span class="tag is-large is-primary">Start</span>
            </header>
            <!--Dummy item to get the line-->
            <div class="timeline-item">
            </div>
            <div v-for="(timelineContents, index) in convertArrayToObject" >
              <!--Choose the heading if we switch the month-->
              <header class="timeline-header">
                <span class="subtitle"><strong>{{ index | moment('MMM, YYYY')}}</strong></span>
              </header>
              <div v-for="(timelineContent, index) in timelineContents" class="timeline-item"
                   :class="timelineContent.category_color" v-if="isThisVisible(timelineContent.category_id)">
                <!--The colour / icon of the box , based on category-->
                <div class="timeline-marker is-image is-32x32 centerWrapper"
                     :class="timelineContent.category_color"
                     v-html="timelineContent.category_icon">
                </div>
                <div class="timeline-content">
                  <!--the timeline contents-->
                  <p class="heading">{{ timelineContent.created | moment('DD MMMM, YYYY')}}</p>
                  <h4 class="title is-4"> {{ timelineContent.title }}</h4>
                  <p class="subtitle" v-html="convertTextToLinks(timelineContent.description)"></p>
                  <!--Buttons to manipulate the timeline content-->
                  <nav class="level is-mobile">
                    <div class="level-left">
                      <a class="level-item" v-on:click="updateTimelineNotes({
                                                          id: timelineContent.id,
                                                          timeline_id: timeline,
                                                          org_id: customer,
                                                          category: timelineContent.category_id,
                                                          date: new Date(timelineContent.created),
                                                          title: timelineContent.title,
                                                          message: replaceBrWithLineBreak(timelineContent.description),
                                                          update: true
                                                        })">
                        <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
                      </a>
                      <a class="level-item" v-on:click="confirmDelete(timelineContent.id, index)">
                        <span class="icon is-small"><i class="fas fa-trash"></i></span>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <!--End tag-->
            <header class="timeline-header">
              <span class="tag is-large  is-primary">End</span>
            </header>
          </div>
        </div>
        <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
          <div class="column is-4" v-if="toggleForm">
            <app-form :timeline="timeline"
                      :orgID="customer"
                      :form="form"
                      v-on:newTimelineData="loadTimeLineData"
                      v-on:clearForm="cleanForm"
                      v-on:populateCategory="loadCategories($event)">
            </app-form>
          </div>
        </transition>
      </div>

    </section>

  </div>
</template>

<script>
  import 'bulma-timeline/dist/bulma-timeline.min.css'
  import timelineForm from './timelineform'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import noContent from './../core/nocontent'

  export default {
    components: {
      'app-form': timelineForm,
      'app-nocontent': noContent
    },
    mixins: [
      defaults, helpers
    ],
    props: [
      'customer', 'timeline', 'title'
    ],
    data: function () {
      return {
        timelineData: [],
        monthTracker: '',
        noContent: true,
        toggleForm: true,
        form: {
          title: '',
          date: new Date(),
          message: '',
          update: false
        },
        categories: '',
        choosenCategory: '0'
      }
    },
    methods: {
      closeDetails: function () {
        return this.$emit('closeDetails')
      },
      replaceBrWithLineBreak: function (str) {
        return str.replace(/<br\s*[\/]?>/gi, "\n")
      },
      loadTimeLineData: function () {
        this.axios.get(this.api.timelineDetails + '?org_id=' + this.customer + '&timeline_id=' + this.timeline).then(response => {
          this.timelineData = response.data
          this.noContent = this.arrayEmpty(this.timelineData)
          this.cleanForm()
        })
      },
      deleteDetails: function (id, index) {
        this.axios.delete(this.api.timelineDetails + id + '/').then(response => {
          this.timelineData.splice(index, 1)
          this.noContent = this.arrayEmpty(this.timelineData)
        })
      },
      confirmDelete: function (id, index) {
        this.$dialog.confirm({
          title: 'Deleting Timeline Note',
          message: 'Are you sure you want to <b>delete</b> this timeline note? This action cannot be undone.',
          confirmText: 'Delete Timeline Note',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteDetails(id, index)
        })
      },
      updateTimelineNotes: function (formData) {
        this.toggleForm = true
        this.form = formData
      },
      cleanForm: function () {
        this.form = {
          title: '',
          date: new Date(),
          message: '',
          update: false,
        }
      },
      loadCategories: function (category) {
        this.categories = category
      },
      isThisVisible: function(id) {
        if (id === this.choosenCategory || this.choosenCategory === '0') {
          return true
        } else {
          return false
        }
      }
    },
    created: function () {
      this.loadTimeLineData()
    },
    computed: {
      convertArrayToObject: function () {
        var collector = {}
        for (let el of this.timelineData) {
          var date = this.dateFormat(el.created).substring(0, 7)
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

<style scoped>

  .float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: red;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
    z-index: 999;
  }

  .my-float {
    margin-top: 22px;
  }

  .centerWrapper:before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

</style>
