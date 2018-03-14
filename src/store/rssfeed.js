import Vue from 'vue'

// RSS Feeder Vuex Store, this contains all the data that is needed for the
// RSS Feeder to work.
export default {
  state: {
    // The Left side menu Items
    menuItems: [{
      id: '',
      item: '',
      route: ''
    }],
    // The Contents of the RSS Feed
    rssContent: [{
      title: '',
      published: '',
      summary: ''
    }],
    // The title of the RSS Feed
    rssTitle: '',
    // Lets start with one and say we have the data, once we pull the data lets set to
    // what we have, if its zero then we tell users that there is nothing.
    rssContentLength: 1
  },
  mutations: {
    // Call the mutation to commit new changes to the store.
    updateRssFields: (state, content) => {
      state.rssTitle = content.data.selected_item
      state.rssContent = content.data.contents
      state.menuItems = content.data.items
      state.rssContentLength = state.rssContent.length
    },
    // Update the MenuItem once the new content is added.
    updateMenuItems: function(state, newItems) {
      state.menuItems.push(newItems)
    }
  },
  actions: {
    // Perform the async operation to pull all the data from the API.
    pullRssContent: (context, id) => {
      Vue.axios.get(process.env.API_URL + 'security/' + id + '/').then((response) => {
        context.commit('updateRssFields', response)
      })
    },
    // Perform the async operation to update the MenuItem.
    pullNewMenuItems: function(context, newItems) {
      context.commit('updateMenuItems', newItems)
    }
  }
}

