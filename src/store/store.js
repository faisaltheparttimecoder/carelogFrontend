import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Collect all the modules onto variable called store.
export const store = new Vuex.Store({
  state: {
    loggedUser: '',
    activeNavbar: '',
    unauthorizedOrExpireToken: false
  },
  mutations: {
    // Call the mutation to commit new changes to the store.
    loggedUserMutation: (state, content) => {
      state.loggedUser = content.data
    },
    activeNavbarMutation: (state, navItem) => {
      state.activeNavbar = navItem
    },
    expiredToken: (state, expired) => {
      state.unauthorizedOrExpireToken = expired
    }
  },
  actions: {
    // Perform the async operation to pull all the data from the API.
    loggedUserAction: (context) => {
      Vue.axios.get(process.env.API_URL + 'connected_user/').then(function (response) {
        context.commit('loggedUserMutation', response)
      }).catch(err => {
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
    }
  }
})
