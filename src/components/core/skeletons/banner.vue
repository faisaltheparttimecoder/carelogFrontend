<!--Banner sections if needed-->
<template>
  <section class="hero">
    <div class="hero-body has-text-centered">
      <p class="title">
        {{ title }}
      </p>
      <p class="subtitle" v-if="subtitle !== ''">
        {{ subtitle }}
      </p>
      <slot name="banner-addon"> </slot>
    </div>
  </section>
</template>

<script>
  export default {
    props: [
     'title', 'subtitle'
    ],
    data: function () {
      return {
        buttonClicked: true
      }
    },
  }
</script>
