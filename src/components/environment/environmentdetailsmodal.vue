<template>

  <div class="modal-card" style="width: 960px" >
    <header class="modal-card-head">
      <p class="modal-card-title"> Environment List </p>
    </header>

    <section class="modal-card-body">

      <div class="field">
        <label class="label">Environment Type</label>
        <div class="control">
          <div class="select">
            <select v-model="instanceDetails.type">
              <option v-for="instanceType in instanceTypes" :value="instanceType.id">{{ instanceType.type }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Environment Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Environment Name" v-model="instanceDetails.name">
          <small><strong>HINT:</strong> Enter the name that customer calls this foundation (eg.s UXPROD etc)</small>
        </div>
      </div>

      <div class="field">
        <label class="label">Environment Infrastructure</label>
        <div class="control">
          <input class="input" type="text" placeholder="Environment Infrastructure" v-model="instanceDetails.infrastructure">
          <small><strong>HINT:</strong> What type of IaaS is the customer using ( eg.s VSphere / AWS etc)</small>
        </div>
      </div>

      <div class="field" v-if="!showProductList">
        <a class="button" v-on:click="$emit('saveInstance')">
          <span class="icon is-small">
            <i class="fas fa-tasks"></i>
          </span>
          <span>{{ instanceDetails.id > 0 ? 'Update' : 'Add' }} Pivotal Product Installed</span>
        </a>
      </div>

      <div v-if="showProductList">
        <small><strong>NOTES:</strong></small><br>
        <small><strong>1.</strong> Try to add the product title / version that matches the product name / version on
          <a href="https://network.pivotal.io/">PivNet</a>
        </small><br>
        <small><strong>2.</strong> The above rule is needed so that its consistent b/w all the customers & also this helps in automating carelog meeting presentation </small> <br>
        <small><strong>3.</strong>
          If you want to automate "product name" addition (rather than entering manually), please select all the product that is applicable to this customer
          using the "Show Product List" button
        </small> <br>
        <small><strong>4.</strong> You can leave the version blank, if the tile is not installed on this environment</small>

        <div class="field is-grouped" v-for="(input, index) in instanceDetails.inputs">
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Product Name" v-model="input.name">
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="Product Version" v-model="input.version">
          </p>
          <p class="control" v-if="emptyData(input.name) && emptyData(input.version)">
            <a class="button is-danger" v-on:click="$emit('deleteRow', index)">
              <i class="fas fa-trash"> </i>
            </a>
          </p>
        </div>

        <div class="field">
          <a class="button" v-on:click="$emit('addRow')">
          <span class="icon is-small">
            <i class="fab fa-wpforms"></i>
          </span>
            <span>Add Rows</span>
          </a>
        </div>

      </div>

    </section>

    <footer class="modal-card-foot">
      <button class="button is-success is-outlined" type="button" @click="$emit('save')" v-if="showProductList">Save</button>
      <button class="button is-danger is-outlined" type="button" @click="$emit('close')">Close</button>
    </footer>
  </div>

</template>

<script>

  import helpers from './../../mixins/helper'
  import defaults from './../../mixins/default'
  export default {
    props: [
      'selectedProductsListName', 'orgID', 'instanceTypes', 'instanceDetails', 'showProductList'
    ],
    mixins: [
      helpers, defaults
    ],
    data: function () {
      return {
        envInstanceInfo: []
      }
    },
  }

</script>
