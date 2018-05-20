<!--Open the modal with all the product list so that the user can choose-->
<template>
  <b-modal :active.sync="showModal" has-modal-card>
    <app-modal :title="this.chooseProductFromList" showSave="true" @save="confirmSave('', 'Product List')">
      <section slot="modal-body">
        <!--Search bar-->
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-primary is-rounded" type="text" placeholder="Search for Products..." v-model="search">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
          <br />
        </div>
        <!--Product name list-->
        <div class="columns" v-for="products in chunkData(filter(allProducts, 'name', search) , 2)">
          <div class="column" v-for="product in products">
            <div class="block">
              <b-checkbox :native-value="product.id" v-model="userSelection">
                {{ product.name }}
              </b-checkbox>
            </div>
          </div>
        </div>
      </section>
    </app-modal>
  </b-modal>
</template>

<script>
  export default {
    props: [
      'allProducts', 'showProductModal', 'orgID', 'productList'
    ],
    data: function() {
      return {
        userSelection: [],
        showModal: false,
        search: ''
      }
    },
    methods: {
      saveData: function () {
        // Check if the user has selected some product
        if (this.arrayEmpty(this.userSelection)) {
          this.notice(this.noProductSelected, 'error', 'error')
          return false
        }
        // time to save, the data to push
        var data = {
          org_id: this.orgID,
          products: this.userSelection
        }
        // check if the product list is on the product table if not post , else put request
        if (this.arrayEmpty(this.productList)) { // POST
          this.post(this.api.envProductList, data).then(response => {
            this.notice(this.postProductListSuccess, 'success', 'success')
            this.$emit('reloadProducts')
          }).catch(error => {
            this.errorParser(this.postProductListSuccess, error)
          })
        } else { // PUT
          this.patch(this.api.envProductList + this.productList.id + '/', data).then(response => {
            this.notice(this.updateProductListSuccess, 'success', 'success')
            this.$emit('reloadProducts')
          }).catch(error => {
            this.errorParser(this.updateProductListSuccess, error)
          })
        }
      }
    },
    watch: {
      // Open the modal
      'showProductModal': function () {
        this.showModal = this.showProductModal
      },
      // Notify the parent that modal has been closed
      'showModal': function () {
        if (!this.showModal) {
          this.$emit('closeModal')
        }
      },
      // Load user selection, based on what we have on the database
      'productList': function () {
        if (!this.arrayEmpty(this.productList)) {
          this.userSelection = this.productList.products
        } else {
          this.userSelection = []
        }
      }
    }
  }
</script>
