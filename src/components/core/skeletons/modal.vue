<!--Basic skeleton for the project model-->
<template>
  <div class="modal-card" style="width: 960px" >
    <header class="modal-card-head">
      <p class="modal-card-title"> {{ title }} </p>
    </header>
    <section class="modal-card-body">
      <slot name="modal-body"> </slot>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger is-outlined" type="button" @click="$parent.close()">
        <span class="icon is-small">
          <i class="fas fa-times"></i>
        </span>
        <span>Close</span>
      </button>
      <button class="button is-outlined" type="button" @click="$emit('save')" v-if="showSave">
        <span class="icon is-small">
          <i class="fas fa-save"></i>
        </span>
        <span>Save</span>
      </button>
    </footer>
  </div>
</template>

<script>
  export default {
    props: [
      'title', 'showSave'
    ]
  }
</script>
