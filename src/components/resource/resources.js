export default {
  data: function() {
    return {
      menuItems: [],
      resources: {id: '', category: '', updated: '', content: ''},
      selectedItem: '',
      updateCategory: {},
      showButton: true,
      switches: {
        save: false,
        edit: true,
        preview: false,
        clear: false,
        cancel: false,
      },
    }
  },
  methods: {
    updateMenuItem: function(event) {
      this.menuItems = this.deepCopyObject(this.updateElement(this.menuItems, event.id, event))
      this.selectedItem = event.name
    },
    // There is no post here, since the entry on the table has already been created by category
    saveData: function (event) {
      this.patch(this.api.resource + this.resources.id + '/' , {
        name: this.resources.name,
        content: event
      }).then(response => {
        this.resources = response
        this.notice(this.resourceUpdateSuccess, 'success', 'success')
      }).catch(error => {
        this.errorParser(this.resourceUpdateFailure, error)
      })
    },
    deleteData: function(id) {
      this.delete(this.api.resource + id + '/').then(response => {
        this.removeElement(this.menuItems, id)
        this.notice(this.categoryDeleteSuccess, 'success', 'success')
      }).catch(error => {
        this.errorParser(this.categoryDeleteFailure, error)
      })
    },
    loadResources: function (id) {
      this.toggleLoading(true)
      this.get(this.api.resource + id + '/').then(response => {
        this.resources = response
        this.selectedItem = response.name
        this.toggleLoading(false)
      }).catch(error => {
        this.errorParser(this.resourcePageLoadFailure, error)
      })
    }
  },
  created: function () {
    this.get(this.api.resource).then(response => {    // All the categories
      this.menuItems = response
      var item = this.pickMenuItem(this.menuItems)
      this.loadResources(item)
    }).catch(error => {
      this.errorParser(this.categoryLoadFailure, error)
    })
    this.$store.dispatch('activeNavbarAction', 'Resources')
  }
}
