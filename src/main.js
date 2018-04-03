// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Plugin addons.
// Buefy
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// Moment for time
Vue.use(require('vue-moment'));

// Google signin
const keys = require('./config/keys')
import VueAuthenticate from 'vue-authenticate'

const oauthRedirectUri = window.location.origin + '/auth/google/redirect'
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

// All Vuex store
import {store} from "./store/store";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: {App},
  template: '<App/>'
})
