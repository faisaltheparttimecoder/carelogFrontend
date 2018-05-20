<!--The template built form fields based on the data send-->
<template>
  <div>
    <!--Some extra custom components-->
    <slot name="top-form"> </slot>
    <!--Loop through the field and generate the form based on what type of field is required-->
    <div v-for="(formField, index) in formFields">
      <!--Build a input field if asked-->
      <div class="field is-horizontal" v-if="formField.formtype === 'input'">
        <div class="field-label is-normal">
          <label class="label">{{ formField.label }}</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded has-icons-left">
              <input class="input" :class="{'is-danger': errors.has(index)}"
                     v-validate="formField.validate"
                     :placeholder="formField.placeholder"
                     v-model=formData[index]
                     :name="index">
              <span class="icon is-small is-left">
                <i :class="formField.icon"></i>
              </span>
            </div>
            <p class="help is-danger">
              {{ errors.first(index) }}
            </p>
          </div>
        </div>
      </div>
      <!--Build a input field if asked-->
      <div class="field is-horizontal" v-if="formField.formtype === 'textarea'">
        <div class="field-label is-normal">
          <label class="label">{{ formField.label }}</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control is-expanded">
              <textarea class="textarea" :class="{'is-danger': errors.has(index)}"
                        v-validate="formField.validate"
                        v-model=formData[index]
                        :name="index"
                        :rows="formField.rows"
                        :placeholder="formField.placeholder">
              </textarea>
            </div>
            <p class="help is-danger">
              {{ errors.first(index) }}
            </p>
          </div>
        </div>
      </div>
      <!--Build dropdown field if requested-->
      <div class="field is-horizontal" v-if="formField.formtype === 'select'">
        <div class="field-label is-normal">
          <label class="label">{{ formField.label }}</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-fullwidth" :class="{'is-danger': errors.has(index)}">
                <select v-validate="formField.validate" v-model=formData[index]
                        :name="index" :placeholder="formField.placeholder">
                  <option value="0" disabled selected>{{formField.placeholder}}</option>
                  <option v-for="option in formField.options" :value="option.id">{{option.name}}</option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i :class="formField.icon"></i>
              </span>
            </div>
            <p class="help is-danger">
              {{ errors.first(index) }}
            </p>
          </div>
        </div>
      </div>
      <!--Build date field if requested-->
      <div class="field is-horizontal" v-if="formField.formtype === 'date'">
        <div class="field-label is-normal">
          <label class="label">{{ formField.label }}</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <div class="select is-fullwidth" :class="{'is-danger': errors.has(index)}">
                <div class="control has-icons-left has-icons-right">
                  <b-datepicker
                    v-validate="formField.validate"
                    v-model=formData[index]
                    :placeholder="formField.placeholder"
                    :name="index"
                    icon="calendar-today"
                    :readonly="false"
                    :max-date="formField.maxDate">
                  </b-datepicker>
                </div>
              </div>
              <span class="icon is-small is-left">
                <i :class="formField.icon"></i>
              </span>
            </div>
            <p class="help is-danger">
              {{ errors.first(index) }}
            </p>
          </div>
        </div>
      </div>
      <!--Build multiple select field-->
      <div class="field is-horizontal" v-if="formField.formtype === 'multiple' && formData.role !== 'Management'">
        <div class="field-label is-normal">
          <label class="label">{{ formField.label }}</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="select is-multiple is-fullwidth" :class="{'is-danger': errors.has(index)}">
                <select multiple
                        :size="formField.size"
                        :name="index"
                        v-validate="formField.validate"
                        v-model=formData[index]>
                  <option v-for="account in formField.options" :value="account.id">{{ account.name }}</option>
                </select>
              </div>
            </div>
            <p class="help is-danger">
            {{ errors.first(index) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--End Loop-->
    <br />
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-outlined" v-on:click="validateData">
          <span class="icon is-small">
            <i class="far fa-save"></i>
          </span>
          <span>Save</span>
        </button>
      </div>
      <div class="control">
        <button class="button is-outlined" v-on:click="clearData">
          <span class="icon is-small">
            <i class="fas fa-eraser"></i>
          </span>
          <span>Clear</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'formFields', 'formData'
    ],
    methods: {
      // Clear all the fields if called
      clearData: function () {
        for (let i in this.formData) {
          if (i === 'accounts') {  // Anything with the accounts fields need to be a array and not a string
            this.formData[i] = []
          } else if (i !== 'id') {  // Id should not be touched ( since its a place holder for update string )
            this.formData[i] = ''
          }
        }
      },
      // Validate data and emit the value to be saved
      validateData: function () {
        this.$validator.validateAll().then((result) => {
          if (!result) {
            return false
          } else {
            this.$emit('saveData', this.formData)
          }
        })
      }
    },
    watch : {
      'formData': function() {
        this.$emit('update:changes', this.formData)
      }
    }
  }
</script>
