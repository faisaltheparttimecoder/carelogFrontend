// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'                              // The main UI Vue Wrapper for Bulma
import VeeValidate from 'vee-validate'  // Form validation library
import {store} from './store/store'     // Global vuex store
import axios from 'axios'               // Axios the VueJS Ajax
import VueAxios from 'vue-axios'        // Axios wrapper for VueJS
import VCharts from 'v-charts'          // Charts Plugin
import Snotify from 'vue-snotify'       // Notification Plugin
import VueAuthenticate from 'vue-authenticate' // App Authentication
import vSelect from 'vue-select'        // Dropdown select module
import 'buefy/lib/buefy.css'            // Carelog UI CSS
import "vue-snotify/styles/simple.css"  // Notification Style
import "./assets/css/carelog.css"       // Carelog global CSS
import helpers from './components/core/utilities/helper'   // Register all the global mixins
import api from './components/core/utilities/api'
import msgCode from './components/core/message/msgcodes'
import notification from './components/core/utilities/notification'
import defaults from './components/core/utilities/defaults'
import nocontent from './components/core/skeletons/nocontent' // Commonly used components
import modal from './components/core/skeletons/modal'
import form from './components/core/form/generator'
import menu from './components/core/menu'
import customer from './components/customer/customer'

// Register all the imported component
Vue.use(Buefy)
Vue.use(VueAxios, axios)
Vue.use(VCharts)
Vue.use(Snotify)
Vue.use(VeeValidate)
Vue.mixin(helpers)
Vue.mixin(api)
Vue.mixin(msgCode)
Vue.mixin(notification)
Vue.mixin(defaults)
Vue.component('v-select', vSelect)
Vue.component('app-no-contents', nocontent)
Vue.component('app-form', form)
Vue.component('app-modal', modal)
Vue.component('app-menu', menu)
Vue.component('app-customer', customer)
Vue.config.productionTip = false

// Authentication of the app (google OAuth)
const oauthRedirectUri = window.location.origin + '/auth/google/redirect'
const keys = require('./config/keys')
Vue.use(VueAuthenticate, {
  baseUrl: keys.baseUrl, // Your API domain
  registerUrl: '/auth/register/',
  loginUrl: '/',
  tokenPrefix: `carelog_${process.env.NODE_ENV}`,
  storageType: 'cookieStorage',
  cookieStorage: {
    domain: window.location.hostname,
    expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), // Store the authentication token for a day
    path: '/',
    secure: false
  },
  providers: {
    google: {
      clientId: keys.google.client_id,
      scope: keys.google.scope,
      redirectUri: oauthRedirectUri, // Your client app URL
      popupOptions: {height: null, width: null}
    }
  }
})

// Vue instance
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
