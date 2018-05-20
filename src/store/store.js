import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Collect all the modules onto variable called store.
export const store = new Vuex.Store({
  state: {
    loggedUser: 'Anonymous',
    activeNavbar: '',
    unauthorizedOrExpireToken: false,
    appLoading: false,
  },
  // Call the mutation to commit new changes to the store.
  mutations: {
    loggedUserMutation: (state, content) => {   // commit connected user name
      state.loggedUser = content.data
    },
    activeNavbarMutation: (state, navItem) => {  // commit active navbar
      state.activeNavbar = navItem
    },
    expiredToken: (state, expired) => {   // commit the user expiration date of the token
      state.unauthorizedOrExpireToken = expired
    },
    toggleLoading: (state, toggle) => { // toogle the visibility of loading action
      state.appLoading = toggle
    }
  },
  // Perform the async operation to pull all the data from the API.
  actions: {
    loggedUserAction: (context) => {    // Get the connected username from django
      Vue.axios.get(process.env.API_URL + 'connected_user/').then(function (response) {
        context.commit('loggedUserMutation', response)
      }).catch(err => {   // If we get a 401 error means the token has expired, so send the login screen to the user
        if ( err.response.status === 401 && err.response.statusText === 'Unauthorized' ) {
          context.commit('expiredToken', true)
        } else {
          console.log(err)
          console.log(err.response)
        }
      })
    },
    activeNavbarAction: (context, navItem) => {
      context.commit('activeNavbarMutation', navItem)
    },
    toggleLoadingAction: (context, switchLoading) => {
      context.commit('toggleLoading', switchLoading)
    }
  }
})
