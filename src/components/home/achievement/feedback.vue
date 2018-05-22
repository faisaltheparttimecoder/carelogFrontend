<template>
  <div>
    <app-tile :data="chunkData(testdata, 2)"
              :showDate="false">
      <template slot-scope="props">
        <h1 class="title is-3"> {{ props.content.receiver }} </h1>
        <h6 class="subtitle is-6"> {{ props.content.sendate }} </h6>
        <blockquote>
          <p>{{ props.content.feedback }}... </p>
        </blockquote>
        <strong>{{ props.content.sender }}</strong> <br>
        <span v-if="!emptyData(props.content.senderdesignation)">{{ props.content.senderdesignation }} </span>
        <span v-if="!emptyData(props.content.customer)">({{ props.content.customer }})</span>
      </template>
    </app-tile>
  </div>
</template>

<script>
  import tile from './../../core/skeletons/tile'
  export default {
    components: {
      'app-tile': tile
    },
    data: function () {
      return {
        testdata: [{feedback: 'This incident was made much easier by being able to work ' +
          'directly with Michael Forrest. By doing a screen share and debugging together, ' +
          'we were able to come to the root cause much more easily, so this was extremely valuable.',
          receiver: 'Hello man', sender: 'Your good will', sendate: '30 March, 2017', senderdesignation: '', customer: 'this company'},
          {feedback: 'This incident was made much easier by being able to work ' +
            'directly with Michael Forrest. By doing a screen share and debugging together, ' +
            'we were able to come to the root cause much more easily, so this was extremely valuable.',
            receiver: 'Hello man', sender: 'Your good will', sendate: '30 March, 2017', senderdesignation: 'Product manager', customer: ''},
          {feedback: 'This incident was made much easier by being able to work ' +
            'directly with Michael Forrest. By doing a screen share and debugging together, ' +
            'we were able to come to the root cause much more easily, so this was extremely valuable.',
            receiver: 'Hello man', sender: 'Your good will', sendate: '30 March, 2017', senderdesignation: 'Product manager', customer: 'this company'}]
      }
    }
  }
</script>

<style scoped>
  blockquote{
    display:block;
    background: #fff;
    padding: 15px 20px 15px 45px;
    margin: 0 0 20px;
    position: relative;
  }
  blockquote::before{
    content: "\201C"; /*Unicode for Left Double Quote*/

    /*Font*/
    font-family: Georgia, serif;
    font-size: 60px;
    font-weight: bold;
    color: #999;

    /*Positioning*/
    position: absolute;
    left: 10px;
    top:5px;

  }
  blockquote::after{
    /*Reset to make sure*/
    content: "";
  }
  blockquote em{
    font-style: italic;
  }
</style>
