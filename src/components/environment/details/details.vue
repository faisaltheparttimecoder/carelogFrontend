<template>
  <section>
    <!--Option bar-->
    <app-button-bar :switches="switches" @add="cleanup(); showEnvironmentForm = true">
      <h1 slot="left-bar" class="title"> Environment Details </h1>
      <div class="level-item" slot="custom-button">
        <a class="button is-outlined" @click="showProductModal = true">
          <span class="icon is-small">
            <i class="fas fa-tasks"></i>
          </span>
          <span> Select Products List </span>
        </a>
      </div>
    </app-button-bar>
    <!--Product selection modal-->
    <app-product-selection :allProducts="allProducts"
                           :orgID="orgID"
                           :productList="productList"
                           :showProductModal="showProductModal"
                           @reloadProducts="getSelectedProducts"
                           @closeModal="showProductModal = false">
    </app-product-selection>
    <!--Form to add or update environment details-->
    <app-environment-form :showEnvironmentForm="showEnvironmentForm"
                          :orgID="orgID"
                          :instanceDetails="instanceDetails"
                          @updateInstance="getEnvDetails"
                          @addRow="instanceDetails.inputs.push({ name: '', version: ''})"
                          @deleteRow="instanceDetails.inputs.splice($event, 1)"
                          @closeModal="showEnvironmentForm = false">
    </app-environment-form>
    <!--Environment cards-->
    <app-environment-cards :orgID="orgID"
                           :instances="instances"
                           @updateInstance="getEnvDetails"
                           @DeleteInstanceProduct="confirmDelete($event, 'Instance Product')"
                           @editInstance="instanceDetails = $event; productSelectionList(); showEnvironmentForm = true">
    </app-environment-cards>
  </section>
</template>

<script>
  import buttonBar from './../../core/skeletons/buttonbar'
  import productSelection from './selection'
  import addForm from './form'
  import cards from './cards'

  export default {
    components: {
      'app-button-bar': buttonBar,
      'app-product-selection': productSelection,
      'app-environment-form': addForm,
      'app-environment-cards': cards
    },
    props: [
      'orgID'
    ],
    data: function () {
      return {
        switches: {add: true}, // Option button we care about here
        showProductModal: false, // show the product modal when clicked
        allProducts: [],         // the collector for all products
        productList: [],       // the list that user have selected
        distintProduct: [],     // distint product list
        showEnvironmentForm: false, // Show the environment add form when clicked
        instances: {}, // Instance collected
        instanceDetails: {   // the instance information that user has put via the form
          id: '',
          type: '0',
          name: '',
          timeline_id: '',
          infrastructure: '',
          inputs: []
        },
      }
    },
    methods: {
      // cleanup the form
      cleanup: function() {
        this.instanceDetails = {
          id: '',
            type: '0',
            name: '',
            timeline_id: '',
            infrastructure: '',
            inputs: []
        }
        this.productSelectionList()
      },
      // delete the product of the instance
      deleteData: function(id) {
        this.delete(this.api.envInstanceProductList + id + '/').then(response => {
          this.getEnvDetails()
          this.notice(this.instanceProductDeleteSuccess, 'success', 'success')
        }).catch(error => {
          this.errorParser(this.instanceProductDeleteFailure, error)
        })
      },
      // Load the product from the database that user have saved for the database
      getSelectedProducts: function () {
        this.showProductModal = false
        this.get(this.api.envProductList + '?org_id=' + this.orgID).then(response => {
          if (!this.arrayEmpty(response)) {
            this.productList = response[0]
          } else {
            this.productList = []
          }
        }).catch(error => {
          this.errorParser(this.environmentProductLoadFailure, error)
        })
        this.getDistinctProducts()
      },
      // get distinct products
      getDistinctProducts: function() {
        this.distintProduct = []
        // now check for all the distinct list of product that users have added in this org.
        this.get(this.api.envProductListInfo + this.orgID + '/').then(response => {
          if (!this.arrayEmpty(response)) {
            for (let i in response) {
              this.distintProduct.push(response[i]['name'])
            }
          }
        }).catch(error => {
          this.errorParser(this.environmentDistinctProductLoadFailure, error)
        })
        this.productSelectionList()
      },
      // place the product information on the list
      productSelectionList: function () {
        // This is a new environment information
        if (this.arrayEmpty(this.instanceDetails.inputs)) {
          this.instanceDetails.inputs = []
          for (let i in this.distintProduct) {
            this.instanceDetails.inputs.push({
              name: this.distintProduct[i],
              version: ''
            })
          }
        } else { // edit field, so let check what we know and what we dont know.
          var deepProductListCopy = this.deepCopyObject(this.distintProduct)
          // Loop through the copy of the product slice and remove the one we know
          // and add the one we dont know
          for (let j in this.instanceDetails.inputs) {
            var index = this.getArrayIndex(deepProductListCopy, this.instanceDetails.inputs[j]['name'])
            if (index >= 0) { deepProductListCopy.splice(index, 1) }
          }
          // now push them to the list.
          for (let i in deepProductListCopy) {
            this.instanceDetails.inputs.push({
              name: deepProductListCopy[i],
              version: ''
            })
          }
        }
        // blank line
        this.instanceDetails.inputs.push({
          name: '',
          version: ''
        })
      },
      // All the saved environments
      getEnvDetails: function () {
        // get the environment information
        this.get(this.api.envInstance + '?ordering=type_id&org_id=' + this.orgID).then(response => {
          this.instances = {}
          for (let i in response) {
            var type = response[i]['environment_type']
            if(this.instances[type] === undefined) {
              this.instances[type] = [response[i]]
            } else {
              this.instances[type].push(response[i])
            }
          }
          this.getDistinctProducts()
        }).catch(error => {
          this.errorParser(this.environmentInstanceListLoadFailure, error)
        })
      }
    },
    watch: {
      // watch for the org change and then get the below data
      'orgID': function () {
        // Get all the product list
        this.get(this.api.product).then(response => {
          this.allProducts = response
          this.getEnvDetails()
          this.getSelectedProducts()
        }).catch(error => {
          this.errorParser(this.productLoadFailure, error)
        })
      },
    }
  }
</script>
