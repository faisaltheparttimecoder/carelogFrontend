<!--Bulma Menu: https://bulma.io/documentation/components/menu/-->
<template>
  <aside class="menu">
    <!--Search contents-->
    <p class="menu-label has-text-weight-bold has-text-primary"> Filter </p>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input is-rounded" v-model="search" type="text" placeholder="Search...">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <!--All extra top template goes here-->
    <slot name="menuTop"> </slot>
    <!-- Main Menu Label / Item -->
    <p class="menu-label has-text-weight-bold has-text-primary">
      {{ menuTitle }}
    </p>
    <!--This menu items will have the option to delete or update, if the users wants to have that options-->
    <ul class="menu-list">
      <li><a v-if="allActive" v-on:click="allContent" class="heading" :class="{'is-active': isActive('All')}"> All</a></li>
      <li v-for="menuItem in filter(menuItems, 'name', search)">
        <!--The page doesn't need that option-->
        <div v-if="!menuModification">
          <a v-on:click="refreshContent(menuItem.id)" :class="{'is-active': isActive(menuItem.name)}" class="heading">
            {{ menuItem.name }}
          </a>
        </div>
        <!--Option to modify the page is needed-->
        <div v-else>
          <div class="columns is-gapless">
            <div class="column is-2">
              <a @click="chevronClicked(menuItem.id)">
                <b-icon
                  :icon="isOpen && openId === menuItem.id ? 'chevron-down' : 'chevron-right'">
                </b-icon>
              </a>
            </div>
            <div class="column is-10">
              <a v-on:click="refreshContent(menuItem.id)" :class="{'is-active': isActive(menuItem.name)}">
                <p> {{ menuItem.name }} </p>
              </a>
            </div>
          </div>
        </div>
        <b-collapse :open.sync="isOpen" v-if="openId === menuItem.id">
          <ul>
            <li>
              <nav class="level">
                <p class="level-item has-text-centered">
                  <a class="has-text-primary" v-on:click="$emit('updateItem', {
                                                    id: menuItem.id,
                                                    name: menuItem.name,
                                                    url: menuItem.url
                                              })">
                    <i class="fas fa-pencil-alt"></i>
                     Update
                  </a>
                </p>
                <p class="level-item has-text-centered">
                  <a class="has-text-primary" v-on:click="$emit('deleteItem', menuItem.id)">
                    <i class="fas fa-trash"></i>
                     Delete
                  </a>
                </p>
              </nav>
            </li>
          </ul>
        </b-collapse>
      </li>
    </ul>
    <!--All extra bottom template goes here-->
    <slot name="menuBottom"> </slot>
    <!--Show the source of the menu if needed-->
    <p class="menu-label has-text-weight-bold has-text-primary" v-if="sourceInfo"> Information Source </p>
    <ul class="menu-list" v-if="sourceInfo">
      <li>
        <a target="_blank" :href="sourceUrl" class="heading" v-html="sourceTitle"></a>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'menuList',
    // All the menu items are send as props to this component.
    props: [
      'menuItems', 'selectedItem', 'menuTitle',
      'sourceUrl', 'sourceTitle', 'sourceInfo',
      'allActive', 'menuModification'
    ],
    // All data for this component
    data: function () {
      return {
        search: '',
        isOpen: false,
        openId: ''
      }
    },
    methods: {
      // Menu item option clicked, show or hide the sub menu
      chevronClicked: function (id) {
        // If the user clicks on the chevron twice toggle
        if (this.isOpen && this.openId === id) {
          this.isOpen = false
        } else { // or if the user opens this then move to the next menu, close the first one if its open
          this.isOpen = true
        }
        this.openId = id
      },
      // Check if the menu clicked is selected menu
      isActive: function (item) {
        return item === this.selectedItem
      },
      // Request for the content
      refreshContent: function (id) {
        this.$emit('refreshContent', id)
      },
      // All content request
      allContent: function () {
        this.$emit('allContent')
      },
    },
  }
</script>

<style scoped>
  .columns.is-gapless:last-child {
    margin-bottom: -3px;
  }
</style>
