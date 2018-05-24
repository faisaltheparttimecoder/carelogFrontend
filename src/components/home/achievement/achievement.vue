<template>
  <section class="section">
    <!--button bar-->
    <app-button-bar :switches="{}">
      <h1 slot="left-bar" class="title"> Feedback & Achievements </h1>
      <div class="level-item" slot="custom-button">
        <a class="button is-outlined" v-on:click="showFeedbackForm = true">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add Feedback</span>
        </a>
      </div>
      <p></p>
      <div class="level-item" slot="custom-button2">
        <a class="button is-outlined" v-on:click="showAchievementForm = true">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add Achievement</span>
        </a>
      </div>
    </app-button-bar>
    <div class="columns">
      <!--Feedback panel-->
      <div class="column is-9">
        <app-feedback :showForm="showFeedbackForm" @closeModal="showFeedbackForm=false"> </app-feedback>
      </div>
      <!--Certification panel-->
      <div class="column is-3">
        <app-certified :showForm="showAchievementForm" @closeModal="showAchievementForm=false"> </app-certified>
      </div>
    </div>
  </section>
</template>

<script>
  import certified from './certified'
  import feedback from './feedback'
  import buttonbar from './../../core/skeletons/buttonbar'
  export default {
    components: {
      'app-certified': certified,
      'app-feedback': feedback,
      'app-button-bar': buttonbar
    },
    data: function() {
      return {
        showAchievementForm: false,
        showFeedbackForm: false
      }
    },
    created: function () {
      return this.$store.dispatch('activeNavbarAction', 'Achievement')
    }
  }
</script>
