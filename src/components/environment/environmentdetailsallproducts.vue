<template>
  <section>
    <h2 class="title is-3"> Choose all products used in customer environment for autofill... </h2>
    <div class="columns"  v-for="products in chunkProducts()" >
      <div class="column" v-for="product in products">
        <div class="block">
          <b-checkbox v-model="userSelection"
                      :native-value="product.id">
            {{ product.name }}
          </b-checkbox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  var chunk = require('chunk')
  export default {
    props: [
      'orgID', 'selectedProducts', 'allProducts'
    ],
    data: function () {
      return {
        userSelection: []
      }
    },
    methods: {
      chunkProducts: function () {
        this.userSelection = this.selectedProducts
        return chunk( this.allProducts , 4 )
      },
    },
    watch: {
      'userSelection': function () {
        this.$emit('selectedProducts', this.userSelection)
      },
    }
  }

</script>

<style>

</style>
