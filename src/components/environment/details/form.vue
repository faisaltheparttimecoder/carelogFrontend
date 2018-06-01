<!--Form to add new environment information, note here we are using the form generator, since this form is-->
<!--little complicated in their working-->
<template>
  <b-modal :active.sync="showModal" has-modal-card>
    <app-modal title="Environment Information" :showSave="showProductList" @save="validateData('product')">
      <section slot="modal-body">
        <!--Field to select the instance type eg. prod, dev, test etc-->
        <div class="field" v-if="!showProductList">
          <label class="label">Environment Type</label>
          <div class="control is-expanded has-icons-left">
            <div class="select" :class="{'is-danger': errors.has('type')}">
              <select v-model="instanceDetails.type" name="type" v-validate="'required|not_in:0'">
                <option value="0" disabled selected>Environment Type</option>
                <option v-for="instanceType in instanceTypes"
                        :value="instanceType.id">
                  {{ instanceType.type }}
                </option>
              </select>
            </div>
            <span class="icon is-small is-left">
              <i class="fas fa-list"></i>
            </span>
            <p class="help is-danger">
              {{ errors.first('type') }}
            </p>
          </div>
        </div>
        <!--Field to enter the name of the environment-->
        <div class="field" v-if="!showProductList">
          <label class="label">Environment Name</label>
          <div class="control is-expanded has-icons-left">
            <input class="input" :class="{'is-danger': errors.has('name')}"
                   name="name"
                   v-validate="'required|max:50'"
                   placeholder="Environment Name"
                   v-model="instanceDetails.name">
            <span class="icon is-small is-left">
              <i class="fas fa-leaf"></i>
            </span>
            <p class="help is-danger"> {{ errors.first('name') }} </p>
            <small><strong>HINT:</strong> Enter the name that customer calls this foundation (eg.s UXPROD etc)</small>
          </div>
        </div>
        <!--The infrastructure where the environment resides on-->
        <div class="field" v-if="!showProductList">
          <label class="label">Environment Infrastructure</label>
          <div class="control is-expanded has-icons-left">
            <input class="input" :class="{'is-danger': errors.has('infrastructure')}"
                   name="infrastructure"
                   v-validate="'required|alpha_dash|max:50'"
                   placeholder="Environment Infrastructure"
                   v-model="instanceDetails.infrastructure">
            <span class="icon is-small is-left">
              <i class="fas fa-server"></i>
            </span>
            <p class="help is-danger"> {{ errors.first('infrastructure') }} </p>
            <small><strong>HINT:</strong> What type of IaaS is the customer using ( eg.s VSphere / AWS etc)</small>
          </div>
        </div>
        <!--Button to save the environment name first and then once its successfully saved -->
        <!--we show them to add the product list-->
        <div class="field" v-if="!showProductList">
          <a class="button" @click="validateData('env')">
            <span class="icon is-small">
              <i class="fas fa-tasks"></i>
            </span>
            <span>{{ instanceDetails.id > 0 ? 'Update' : 'Add' }} Environment Instance & Show Pivotal Products</span>
          </a>
        </div>
        <!--The form to add pivotal products-->
        <div v-if="showProductList">
          <!--Notes for the form-->
          <small><strong>NOTES:</strong></small><br>
          <small>
            <strong>1.</strong> Try to add the product title / version that matches the product name / version on
            <a href="https://network.pivotal.io/">PivNet</a>
          </small><br>
          <small>
            <strong>2.</strong> The above rule is needed so that its consistent b/w all the customers & also t
            his helps in automating carelog meeting presentation
          </small> <br>
          <small>
            <strong>3.</strong> If you want to automate "product name" addition (rather than entering manually),
            please select all the product that is applicable to this customer using the "Show Product List" button
          </small> <br>
          <small><strong>4.</strong> You can leave the version blank, if the tile is not installed on this environment</small>
          <!--the product add form fields-->
          <div class="field is-grouped" v-for="(input, index) in instanceDetails.inputs">
            <!--Product field-->
            <div class="control is-expanded has-icons-left">
              <input class="input" :class="{'is-danger': errors.has('product' + index)}"
                     v-validate="'max:200'"
                     :name = "'product' + index"
                     placeholder="Product Name"
                     v-model="input.name">
              <span class="icon is-small is-left">
                <i class="fab fa-product-hunt"></i>
              </span>
              <p class="help is-danger"> {{ errors.first('product' + index) }} </p>
            </div>
            <!--version information-->
            <div class="control is-expanded has-icons-left">
              <input class="input" :class="{'is-danger': errors.has('version' + index)}"
                     v-validate="'max:50'"
                     :name = "'version' + index"
                     placeholder="Product Version"
                     v-model="input.version">
              <span class="icon is-small is-left">
                <i class="fas fa-code-branch"></i>
              </span>
              <p class="help is-danger"> {{ errors.first('version' + index) }} </p>
            </div>
            <!--if the product & version both are empty provvide option for the -->
            <!--user to remove the field-->
            <div class="control" v-if="emptyData(input.name) && emptyData(input.version)">
              <a class="button" v-on:click="$emit('deleteRow', index)">
                <i class="fas fa-trash"> </i>
              </a>
            </div>
          </div>
          <!--add more rows of if the user needs on-->
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
    </app-modal>
  </b-modal>
</template>

<script>
  export default {
    props: [
      'showEnvironmentForm', 'orgID', 'instanceDetails'
    ],
    data: function () {
      return {
        showModal: false,
        showProductList: false,
        timelineContent: '',
        category_id: '',
        envInstanceInfo: [],
        instanceTypes: [],    // all the instance types we know about
      }
    },
    methods: {
      // Validate data and emit the value to be saved
      validateData: function (type) {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            return false
          } else {
            if (type === 'env') { // validate environment name and type etc
              this.saveInstance()
            } else { // validate product form
              this.confirmSave('', 'Environment Details')
            }
          }
        })
      },
      // Instance save flow.
      saveInstance: function () {
        // the data
        var data = {
          type_id: this.instanceDetails.type,
          org_id: this.orgID,
          timeline_id: this.instanceDetails.timeline_id,
          name: this.capitalizeFirstLetter(this.instanceDetails.name),
          infrastructure: this.instanceDetails.infrastructure,
          updated: new Date(),
        }
        // Create a timeline first if there is no timeline id available.
        if ( this.instanceDetails.timeline_id === null || this.instanceDetails.timeline_id === '') {
          this.createTimeline(data)
        } else { // else save the instance directly
          this.instanceUpdate(data)
        }
      },
      // Create timeline if this is a new environment.
      createTimeline: function(instanceInfo) {
        var data = {
          org_id: this.orgID,
          title: 'Environment \"' + this.instanceDetails.name + "\" Upgrade History",
          description: "Timeline to track the historical product updates or upgrade on the " +
          "environment \"**" + this.instanceDetails.name + "**\". \n **Please note:** This timeline is auto " +
          "generated when making changes to the environment details page under " +
          "_**Customer** > **[Customer Name]** > **Environment** > **Environment Details**_"
        }
        // Save the time information
        this.post(this.api.timeline, data).then(response => {
          instanceInfo.timeline_id = response.id
          this.instanceUpdate(instanceInfo)
        }).catch(error => {
          this.errorParser(this.failedTimeLineCreation, error)
        })
      },
      // Save the instance information calling the API endpoint
      instanceUpdate: function(data) {
        // Post if the is fresh , else update if we know about this environment
        if (this.instanceDetails.id === '') {
          this.post(this.api.envInstance, data).then(response => { // Post request
            this.envInstanceInfo = response
            this.showProductList = true
            this.$emit('updateInstance')
          }).catch(error => {
            this.errorParser(this.environmentInstancePostFailure, error)
          })
        } else { // PUT request
          this.patch(this.api.envInstance + this.instanceDetails.id + '/', data).then(response => { // Put request
            this.envInstanceInfo = response
            this.showProductList = true
            this.$emit('updateInstance')
          }).catch(error => {
            this.errorParser(this.environmentInstancePutFailure, error)
          })
        }
      },
      // save all the product list
      saveData: function () {
        var success = true
        this.timelineContent = ''
        this.toggleLoading(true)
        // Loop through the product list
        for (let i in this.instanceDetails.inputs) {
          // if there is no information about the product
          if (!this.emptyData(this.instanceDetails.inputs[i]['name'])) {
            this.timelineContents(this.instanceDetails.inputs[i])
            // the data to save
            var data = {
              instance_id: this.envInstanceInfo.id,
              name: this.instanceDetails.inputs[i]['name'],
              version: this.instanceDetails.inputs[i]['version']
            }
            // New product
            if (!this.isUndefinedBool(this.instanceDetails.inputs[i]['id'])) {
              this.post(this.api.envInstanceProductList, data).then(response => {
              }).catch(error => {
                success = false
                this.errorParser(this.environmentInstanceProductPostFailure, error)
                return false
              })
            } else { // Old product , updating them if there is any changes
              this.patch(this.api.envInstanceProductList + this.instanceDetails.inputs[i]['id'] + '/', data).then(response => {
              }).catch(error => {
                success = false
                this.errorParser(this.environmentInstanceProductPostFailure, error)
                return false
              })
            }
          }
        }
        // since the data is being send via ajax, we use the dirty method or setting timeout
        // to wait for it to finish before reloading the content
        // There is no error, so save the information to the timeline
        var _this = this
        setTimeout(function () {
          if (success) {
            _this.notice(_this.successfullySavedProductInfo, 'success', 'success')
            _this.showModal = false
            _this.showProductList = false
            _this.post(_this.api.timelineDetails, {
              timeline_id: _this.envInstanceInfo.timeline_id,
              org_id: _this.orgID,
              created: new Date(),
              title: 'Product Status as of \"' + _this.dateFormat(new Date(), '/') + '\"',
              category_id: _this.category_id,
              description: _this.timelineContent
            }).catch(error => {
              _this.errorParser(_this.failureToPostToTimeline, error)
            })
          }
          // Update the environment page
          _this.$emit('updateInstance')
          _this.envInstanceInfo = []
          _this.toggleLoading(false)
        }, 1000)
      },
      // For all the product create a time line content
      timelineContents: function (data) {
        this.timelineContent = this.timelineContent + '+ **' + data['name'] + ':** ' + data['version'] + '\n'
      }
    },
    // Get all the environment type
    created: function() {
      // Get all the environment instance type
      this.get(this.api.envInstanceType).then(response => {
        this.instanceTypes = response
      }).catch(error => {
        this.errorParser(this.instanceTypeLoadFailure, error)
      })
      // Get the id of the category activity.
      this.get(this.api.timelineCategory + '?name=Activity').then(response=>{
        if (!this.arrayEmpty(response)) { this.category_id = response[0]['id'] }
      }).catch(error => {
        this.errorParser(this.categoryLoadFailure, error)
      })
    },
    watch: {
      // Open the modal
      'showEnvironmentForm': function () {
        this.showModal = this.showEnvironmentForm
      },
      // Notify the parent that modal has been closed
      'showModal': function () {
        this.showProductList = false
        if (!this.showModal) {
          this.$emit('closeModal')
        }
      },
    }
  }
</script>
