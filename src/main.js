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

// Moment for date format
Vue.use(require('vue-moment'));

// All Vuex store
import { store } from "./store/store";

// Initializing new Vue Instance.
new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
