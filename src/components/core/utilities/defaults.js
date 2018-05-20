export default {
  data: function () {
    return {
      // table features
      tableCustomization: {
        isPaginated: true,
        isPaginationSimple: true,
        currentPage: 1,
        perPage: 15,
        isNarrowed: true,
        isStriped: true,
        hasMobileCards: true,
        isEmpty: false,
        defaultSortDirection: 'desc'
      },
      // markdownSwitches
      markdownSwitches: {
        source: '',
        show: true,
        html: true,
        breaks: true,
        linkify: true,
        typographer: true,
        originalSource: ''
      },
    }
  }
}
