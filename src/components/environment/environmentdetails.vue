<template>
    <div>
      <app-options :selectedProducts="selectedProductsList"
                   :orgID="orgID"
                   :productListID="productID"
                   :showSave="showProducts"
                   v-on:showModal="showModal = true"
                   v-on:loadProductNames="getSelectedProducts"
                   v-on:showProduct="showProducts = !showProducts">
      </app-options>

      <app-no-content v-if="!contentExists && !showProducts"
                      :message="'There is no environment details available, try adding one by clicking on Add Button...'">
      </app-no-content>

      <app-products-list v-if="showProducts"
                         :orgID="orgID"
                         :selectedProducts="selectedProductsList"
                         :allProducts="allProducts"
                         v-on:selectedProducts="selectedProducts">
      </app-products-list>

      <app-cards v-if="!showProducts && contentExists"
                 :orgID="orgID"
                 :instances="instances"
                 v-on:deleteInstance="confirmDelete"
                 v-on:DeleteInstanceProduct="confirmDeleteProduct"
                 v-on:updateInstance="edit">
      </app-cards>

      <b-modal :active.sync="showModal" has-modal-card>
        <app-modal :selectedProductsListName="selectedProductsListName"
                   :orgID="orgID"
                   :instanceTypes="instanceTypes"
                   :instanceDetails="instanceDetails"
                   :showProductList="showProductList"
                   v-on:saveInstance="saveInstance()"
                   v-on:deleteRow="deleteRow"
                   v-on:addRow="addRow"
                   v-on:save="save()"
                   v-on:close="close">
        </app-modal>
      </b-modal>

    </div>

</template>

<script>

  var qs = require('qs')
  import allProductList from './environmentdetailsallproducts'
  import noContent from './../core/nocontent'
  import options from './environmentdetailsoptions'
  import defaults from './../../mixins/default'
  import helpers from './../../mixins/helper'
  import cards from './environmentdetailscards'
  import modal from './environmentdetailsmodal'
  export default {
    components: {
      'app-products-list': allProductList,
      'app-options': options,
      'app-no-content': noContent,
      'app-cards': cards,
      'app-modal': modal
    },
    mixins: [
      defaults, helpers
    ],
    props: [
      'orgID'
    ],
    data: function () {
      return {
        selectedProductsList: [],
        selectedProductsListName: [],
        productID: '',
        allProducts: [],
        contentExists: true,
        showProducts: false,
        showModal: false,
        instances: {},
        instanceTypes: [],
        instanceDetails: {
          id: '',
          type: '',
          name: '',
          infrastructure: '',
          inputs: []
        },
        showProductList: false,
      }
    },
    methods: {
      deleteInstance: function (id) {
        this.axios.delete(this.api.envInstance + id + '/').then(response => {
          this.getEnvDetails()
          this.emitMessage("Environment Instance Successfully Deleted", "is-success")
        }).catch(e => {
          console.log(e.response)
          this.emitMessage("Failure in deleting Environment Instance", "is-danger")
        })
      },
      DeleteInstanceProduct: function (id) {
        this.axios.delete(this.api.envInstanceProductList + id + '/').then(response => {
          this.getEnvDetails()
          this.emitMessage("Environment Instance Product Successfully Deleted", "is-success")
        }).catch(e => {
          console.log(e.response)
          this.emitMessage("Failure in deleting Environment Instance Product", "is-danger")
        })
      },
      confirmDelete: function (id) {
        this.$dialog.confirm({
          title: 'Deleting Instance',
          message: 'Are you sure you want to <b>delete</b> this environment Instance? This action cannot be undone.',
          confirmText: 'Delete Environment Instance',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteInstance(id)
        })
      },
      confirmDeleteProduct: function (id) {
        this.$dialog.confirm({
          title: 'Deleting Instance Product',
          message: 'Are you sure you want to <b>delete</b> this environment Instance Product? This action cannot be undone.',
          confirmText: 'Delete Environment Instance Product',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.DeleteInstanceProduct(id)
        })
      },
      getSelectedProducts: function () {
        this.showProducts = false
        this.axios.get(this.api.envProductList + '?org_id=' + this.orgID ).then(response => {
          if (response.data[0] !== undefined) {
            this.productID = response.data[0]['id']
            this.selectedProductsList = response.data[0]['products']
            this.selectedProductsListName = response.data[0]['environment_product_list']
          } else {
            this.productID = ''
            this.selectedProductsList = []
            this.selectedProductsListName = []
          }
        })
      },
      selectedProducts: function (select) {
        this.selectedProductsList = select
      },
      getEnvDetails: function () {
        this.axios.get(this.api.envInstance + '?ordering=type_id&org_id=' + this.orgID).then(response => {
          this.instances = {}
          for (let i in response.data) {
            var type = response.data[i]['environment_type']
            if(this.instances[type] === undefined) {
              this.instances[type] = [response.data[i]]
            } else {
              this.instances[type].push(response.data[i])
            }
          }

          // Check if the content exists
          if (Object.keys(this.instances).length === 0) {
            this.contentExists = false
          } else {
            this.contentExists = true
          }

        })
      },
      close: function() {
        this.instanceDetails = {
          id: '',
          type: '',
          name: '',
          infrastructure: '',
          inputs: []
        }
        this.showModal = false
        this.showProductList = false
      },
      save: function() {
        var success = true
        for (let i in this.instanceDetails.inputs) {
          if (this.instanceDetails.inputs[i]['name'] !== '') {
            if (this.instanceDetails.inputs[i]['id'] === undefined) {
              this.axios.post(this.api.envInstanceProductList, qs.parse({
                instance_id: this.envInstanceInfo.id,
                name: this.instanceDetails.inputs[i]['name'],
                version: this.instanceDetails.inputs[i]['version']
              })).then(response => {
              }).catch(e => {
                success = false
                console.log(e.response)
                this.emitMessage("Failure in recording the instance information, check the browser console log for more information", 'is-danger')
                return false
              })
            } else {
              this.axios.put(this.api.envInstanceProductList + this.instanceDetails.inputs[i]['id'] + '/', qs.parse({
                instance_id: this.envInstanceInfo.id,
                name: this.instanceDetails.inputs[i]['name'],
                version: this.instanceDetails.inputs[i]['version']
              })).then(response => {
              }).catch(e => {
                success = false
                console.log(e.response)
                this.emitMessage("Failure in updating the instance information, check the browser console log for more information", 'is-danger')
                return false
              })
            }
          }
        }

        // There is no error
        if (success) {
          this.emitMessage("Successfully recorded the instance information", 'is-success')
          this.showProductList = false
          this.close()
        }

        this.getEnvDetails()
      },
      addRow: function() {
        this.instanceDetails.inputs.push({
          product: '',
          version: ''
        })
      },
      deleteRow: function(index) {
        this.instanceDetails.inputs.splice(index, 1)
      },
      productSelected: function () {

        // This is a new environment information
        if ( this.instanceDetails.inputs.length === 0 ) {
          for (let i in this.selectedProductsListName) {
            this.instanceDetails.inputs.push({
              name: this.selectedProductsListName[i],
              version: ''
            })
          }
        } else { // this is when the user clicks on edit, pull in the new product list if selected.
          var deepProductListCopy = this.selectedProductsListName.slice()
          for (let j in this.instanceDetails.inputs) {
            var index = deepProductListCopy.indexOf(this.instanceDetails.inputs[j]['name'])
            if (index >= 0) { deepProductListCopy.splice(index, 1) }
          }
          for (let i in deepProductListCopy) {
            this.instanceDetails.inputs.push({
              name: deepProductListCopy[i],
              version: ''
            })
          }
        }
        this.instanceDetails.inputs.push({
          name: '',
          version: ''
        })
        this.showProductList = true
      },
      saveInstance: function () {
        for (let i in this.instanceDetails) {
          if (this.instanceDetails[i] === '' && i !== 'id') {
            this.emitMessage("Environment " + i + " field is left empty, this is required", "is-danger")
            return false
          }
        }

        if (this.instanceDetails.id === '') { // new
          this.axios.post(this.api.envInstance, qs.parse({
            type_id: this.instanceDetails.type,
            org_id: this.orgID,
            name: this.instanceDetails.name,
            infrastructure: this.instanceDetails.infrastructure,
            updated: new Date()
          })).then(response => {
            this.envInstanceInfo = response.data
            this.productSelected()
          }).catch(e => {
            console.log(e.response)
            this.emitMessage("Error in creating environment instance, check browser logs for more info", 'is-danger')
          })
        } else { // edit

          this.axios.put(this.api.envInstance + this.instanceDetails.id + '/', qs.parse({
            type_id: this.instanceDetails.type,
            org_id: this.orgID,
            name: this.instanceDetails.name,
            infrastructure: this.instanceDetails.infrastructure,
            updated: new Date()
          })).then(response => {
            this.envInstanceInfo = response.data
            this.productSelected()
          }).catch(e => {
            console.log(e.response)
            this.emitMessage("Error in updating environment instance, check browser logs for more info", 'is-danger')
          })

        }


      },
      edit: function (event) {
        this.instanceDetails =  {
          id: event.id,
          type: event.type_id,
          name: event.name,
          infrastructure: event.infrastructure,
          inputs: event['environment_instance']
        }
        this.showModal = true
      }
    },
    watch: {
       'orgID': function () {
         // Get all the product list
         this.axios.get(this.api.product).then(response => {
           this.allProducts = response.data
           this.getSelectedProducts()
         })

         // Get all the environment list for this org
         this.getEnvDetails()

         // Get all the environment type
         this.axios.get(this.api.envInstanceType).then(response => {
           this.instanceTypes = response.data
         })
       },
     }
  }

</script>

<style>

</style>
