<template>
  <!--Bulma Menu: https://bulma.io/documentation/components/menu/-->
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

    <!--All extra template goes here-->
    <slot name="menuTop"></slot>

    <!-- Main Menu Label / Item -->
    <p class="menu-label has-text-weight-bold has-text-primary">
      {{ menuTitle }}
    </p>
    <ul class="menu-list">
      <li><a v-if="allActive" v-on:click="allContent" class="heading"> All</a></li>
      <li v-for="menuItem in filterProducts()">
        <a v-on:click="refreshContent(menuItem.id)" :class="{'is-active': isActive(menuItem.name)}" class="heading">
          {{ menuItem.name }}
        </a>
      </li>
    </ul>

    <!--All extra template goes here-->
    <slot name="menuBottom"></slot>

    <!--Show the source of the menu-->
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
      'menuItems', 'selectedItem', 'menuTitle', 'sourceUrl', 'sourceTitle', 'sourceInfo', 'allActive'
    ],
    // All data for this component
    data: function () {
      return {
        search: ''
      }
    },
    methods: {
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
      // Use the filter to filter out the content based on user search.
      filterProducts: function () {
        return this.menuItems.filter((product) => {
          return product.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
  }
</script>

<style scoped>
</style>
