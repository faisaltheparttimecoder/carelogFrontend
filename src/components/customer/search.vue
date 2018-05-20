<!--Search for the customer -->
<template>
  <app-form :formFields="formFields"
            :formData.sync="formData"
            v-on:saveData="confirmSave($event, 'Customer')">
    <!--Adding a custom form field for searching the customer-->
    <div class="field is-horizontal" slot="top-form">
      <div class="field-label is-normal">
        <label class="label">Find Customer</label>
      </div>
      <div class="field-body">
        <div class="field">
          <b-autocomplete v-model="formData.name"
                          :data="data"
                          class="is-danger"
                          icon="magnify"
                          :loading="isFetching"
                          placeholder="Search Customer..."
                          field="name"
                          @input="getAsyncData"
                          @select="option => selected = option">
            <!--Once found the template to highlight the search result-->
            <template slot-scope="props">
              <div class="media">
                <div class="media-content">
                  <strong>{{ props.option.name }}</strong>
                  <br>
                  <small>
                    <strong>Created at:</strong> {{ formatDate(props.option.created_at, false) }}
                    <br>
                    <strong>Location:</strong>
                    <span class="uppercase">
                      {{ trimData(props.option.organization_fields.customer_location, 9, null) }}
                    </span>
                  </small>
                </div>
              </div>
            </template>
          </b-autocomplete>
          <p class="help is-danger" v-if="nothingSelected">
            {{ noCustomerSelected }}
          </p>
        </div>
      </div>
    </div>
  </app-form>
</template>

<script>
  import debounce from 'lodash/debounce'
  export default {
    props: [
      'countriesList'
    ],
    data: function () {
      return {
        data: [],
        isFetching: false,
        nothingSelected: false,
        selected: null,
        formFields: {           // All the field, that is need for the generator or to build the form
          location: {
            formtype: 'select',
            label: 'Location',
            placeholder: "Select customers location or HQ...",
            validate: 'required|not_in:0',
            icon: 'fas fa-globe',
            options: this.countriesList
          },
        },
        formData : {
          location: '0',
          name: ''
        }
      }
    },
    methods: {
      // When the user stop typing, find the customer that
      // starts with that name
      // You have to install and import debounce to use it,
      // it's not mandatory though.
      getAsyncData: debounce(function () {
        this.data = []
        this.isFetching = true
        this.nothingSelected = false
        var url = this.api.search + 'organization name:'
        this.get(url + this.formData.name + '*').then(data => {
            data.results.forEach((item) => this.data.push(item))
            this.isFetching = false
          }).catch((error) => {
            this.isFetching = false
          })
      }, 500),
      // Save the customer that user have selected.
      saveData: function () {
        // If the user didn't select anything from the list
        // Then pass out the error
        if (this.selected === null) {
          this.nothingSelected = true
          return false
        }
        // Build the object to be passed onto the
        // database for saving
        var saveOrg = {
          org_id: this.selected.id,
          name: this.selected.name,
          created_at: this.dateFormat(this.selected.created_at, '-'),
          location: this.selected.organization_fields.customer_location,
          expired_contract: this.selected.organization_fields.expired_contract,
          recently_added: true,
          archived: false,
          country: this.formData.location
        }
        // Save data
        this.post(this.api.org, saveOrg).then(response => {
          this.notice(this.addCustomerSuccess, 'success', 'success')
          this.$emit('newOrg', response)
        }).catch(error => {
          this.errorParser(this.addCustomerFailure, error)
        })
      },
    }
  }
</script>

<style scoped>
  .uppercase {
    text-transform: uppercase;
  }
</style>
