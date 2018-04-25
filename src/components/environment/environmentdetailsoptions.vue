<template>
  <nav class="level">
    <div class="level-left">
    </div>
    <div class="level-right">
      <div class="level-item">
        <a class="button" v-on:click="$emit('showModal')">
          <span class="icon is-small">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add</span>
        </a>
      </div>
      <div class="level-item" v-if="showSave">
        <a class="button" v-on:click="saveCheckProducts()">
          <span class="icon is-small">
            <i class="fas fa-save"></i>
          </span>
          <span>save</span>
        </a>
      </div>
      <div class="level-item">
        <a class="button is-outlined" :class="{'is-danger': showSave}" v-on:click="$emit('showProduct')">
          <span class="icon is-small">
            <i class="far fa-hand-pointer"></i>
          </span>
          <span>{{ showSave ? "Close" : "Show" }} Products List</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>

  var qs = require('qs')
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  export default {
    props: [
      'selectedProducts', 'orgID', 'productListID', 'showSave'
    ],
    mixins: [
      defaults, helpers
    ],
    methods: {
      saveCheckProducts: function () {
        if (this.arrayEmpty(this.selectedProducts)) {
          this.emitMessage('Nothing selected', 'is-danger')
          return false
        }
        if (this.productListID === '') {
          this.axios.post(this.api.envProductList, qs.parse({
            org_id: this.orgID,
            products: this.selectedProducts
          })).then(response => {
            this.$emit('loadProductNames')
            this.emitMessage("Successfully saved product list for this organization..", 'is-success')
          }).catch(e => {
            console.log(e)
            console.log(e.response)
            this.emitMessage("Error received while updating the product list, check console log for more information", 'is-danger')
          })
        } else {
          this.axios.put(this.api.envProductList + this.productListID + '/', qs.parse({
            org_id: this.orgID,
            products: this.selectedProducts
          })).then(response => {
            this.$emit('loadProductNames')
            this.emitMessage("Successfully updated product list for this organization..", 'is-success')
          }).catch(e => {
            console.log(e)
            console.log(e.response)
            this.emitMessage("Error received while updating the product list, check console log for more information", 'is-danger')
          })
        }
      }
    }
  }

</script>
