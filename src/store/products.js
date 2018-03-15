import Vue from 'vue'

// Product Vuex Store, this contains all the data that is needed for the
// product to work.
export default {
  state: {
    // The Left side menu Items
    menuItems: [{
      "model": "product.product",
      "pk": '',
      "fields": {"name": '', "url": '', 'slug': ''}
    }],
    // Selected product title
    productTitle: '',
    // The Contents of the pivotal products
    productContent: [{
      version: '',
      release_type: '',
      release_date: '',
      release_notes_url: '',
      availability: '',
      end_of_support_date: '',
      end_of_guidance_date: ''
    }]
  },
  mutations: {
    // Call the mutation to commit new changes to the store.
    updatePivotalFields: (state, content) => {
      state.menuItems = content.data.items
      state.productTitle = content.data.selected_item
      state.productContent = content.data.contents
    },
  },
  actions: {
    // Perform the async operation to pull all the data from the API.
    pullPivotalProducts: (context, id) => {
      Vue.axios.get(process.env.API_URL + 'product/' + id + '/').then((response) => {
        context.commit('updatePivotalFields', response)
      })
    }
  }
}
