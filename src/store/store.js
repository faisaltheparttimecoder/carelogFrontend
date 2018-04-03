import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Collect all the modules onto variable called store.
export const store = new Vuex.Store({
  state: {
    loggedUser: '',
    activeNavbar: ''
  },
  mutations: {
    // Call the mutation to commit new changes to the store.
    loggedUserMutation: (state, content) => {
      state.loggedUser = content.data
    },
    activeNavbarMutation: (state, navItem) => {
      state.activeNavbar = navItem
    }
  },
  actions: {
    // Perform the async operation to pull all the data from the API.
    loggedUserAction: (context) => {
      Vue.axios.get(process.env.API_URL + 'connected_user/').then(function (response) {
        context.commit('loggedUserMutation', response)
      })
    },
    activeNavbarAction: (context, navItem) => {
      context.commit('activeNavbarMutation', navItem)
    }
  }
})
