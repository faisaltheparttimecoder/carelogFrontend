export default {
  data: function () {
    return {
      // Global table customization
      tableCustomization: {
        isPaginated: true,
        isPaginationSimple: true,
        currentPage: 1,
        perPage: 15,
        isNarrowed: true,
        isStriped: true,
        hasMobileCards: true,
        isEmpty: false,
        isLoading: true,
        defaultSortDirection: 'desc'
      },

      // Initializing menuItem here, here we will need to provide a key
      // since the axios takes time and the vue instance fails if the keys doesn't exists
      menuItems: [{
        id: '',
        name: '',
        url: '',
        slug: ''
      }],

      // Selected Item from the menu.
      selectedItem: '',

      // Is the menu form active
      menuFormActive: false,

      // Does it have a content
      contextExists: false,

      // All content request
      allActive: false,


      // All the API link
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
        ticketHot: process.env.API_URL + 'api/customer/hottickets/',
        timeline: process.env.API_URL + 'api/customer/timeline/',
        timelineCategory: process.env.API_URL + 'api/customer/timeline_category/',
        timelineDetails: process.env.API_URL + 'api/customer/timeline_details/',
        dashboard: process.env.API_URL + 'api/customer/tickets/',
        environment:  process.env.API_URL + 'api/customer/environment/',
        team: process.env.API_URL + 'api/bcs/team/'
      }

    }
  }
}
