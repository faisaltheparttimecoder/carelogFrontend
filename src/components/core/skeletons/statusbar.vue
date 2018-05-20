<!--Skeleton to build the status text bar-->
<template>
  <div class="box">
    <nav class="level is-mobile">
      <div v-for='(value, index) in status' class="level-item has-text-centered">
        <div>
          <p class="heading">{{ index }}</p>
          <p class="title" v-html="value"></p>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    props: [
      'status'
    ]
  }
</script>
