<template>
  <!--Floating button to close the page-->
  <a v-on:click="$emit('closeDetails')" class="float">
    <i class="fas fa-times my-float"></i>
  </a>
</template>

<style>
  .float {
    position: fixed;
    width: 60px;
    height: 60px;
    bottom: 40px;
    right: 40px;
    background-color: #7957d5;
    color: #FFF;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
    z-index: 999;
  }
  .my-float {
    margin-top: 22px;
  }
</style>
