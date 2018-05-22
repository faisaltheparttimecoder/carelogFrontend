var qs = require('qs')  // This library helps to convert the data to Django specific format
export default {
  // All the backend URL.
  data: function () {
    return {
      api: {
        links: process.env.API_URL + 'api/links/',
        category: process.env.API_URL + 'api/category/',
        security: process.env.API_URL + 'api/security/',
        product: process.env.API_URL + 'api/products/',
        search: process.env.API_URL + 'api/customer/search/query=type:',
        org: process.env.API_URL + 'api/customer/organisation/',
        ticketComments: process.env.API_URL + 'api/customer/comments/',
        ticketNotes: process.env.API_URL + 'api/customer/ticketnotes',
        ticketMetrics: process.env.API_URL + 'api/customer/metrics/',
        ticketAttribute: process.env.API_URL + 'api/customer/ticketattribute/',
        timeline: process.env.API_URL + 'api/customer/timeline/',
        timelineCategory: process.env.API_URL + 'api/customer/timeline_category/',
        timelineDetails: process.env.API_URL + 'api/customer/timeline_details/',
        dashboard: process.env.API_URL + 'api/customer/tickets/',
        environment:  process.env.API_URL + 'api/customer/environment/',
        team: process.env.API_URL + 'api/bcs/team/',
        main: process.env.API_URL + 'api/bcs/main/',
        certification: process.env.API_URL + 'api/bcs/certification/',
        country: process.env.API_URL+ 'api/customer/country/',
        envProductList: process.env.API_URL + 'api/customer/environment/environment_details_product_list/',
        envProductListInfo: process.env.API_URL + 'api/customer/environment/environment_product_info/',
        envInstance:  process.env.API_URL + 'api/customer/environment/environment_instance/',
        envInstanceProductList:  process.env.API_URL + 'api/customer/environment/environment_instance_product/',
        envInstanceType:  process.env.API_URL + 'api/customer/environment/environment_type/'
      }
    }
  },
  // All API call methods
  methods: {
    get: function(url) {  // Get Request
      return this.axios.get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
    },
    post: function(url, data) {  // Post Request
      return this.axios.post(url, qs.parse(data))
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))

    },
    patch: function(url, data) {  // Update Request
      return this.axios.put(url, qs.parse(data))
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
    },
    delete: function(url) {  // Delete Request
      return this.axios.delete(url)
        .then((response) => Promise.resolve(response))
        .catch((error) => Promise.reject(error))
    }
  }
}
