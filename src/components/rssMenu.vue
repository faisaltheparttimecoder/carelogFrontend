<template>
  <!--Bulma Menu: https://bulma.io/documentation/components/menu/-->
  <aside class="menu">
    <!-- Main Menu Label / Item -->
    <p class="menu-label">
      {{ menuTitle }}
    </p>
    <ul class="menu-list">
      <li v-for="menuItem in menuItems" >
        <a v-on:click="requestRssContent(menuItem.id)" :class="{'is-active': isActive(menuItem.item)}" class="heading">
          {{ menuItem.item }}
        </a>
      </li>
    </ul>
    <!--All Action buttons here-->
    <p class="menu-label">
      Action
    </p>
    <div class="field">
      <p class="control">
        <a class="button is-success is-outlined" @click="openModal">
          <span class="icon is-small">
            <i class="fas fa-rss-square"></i>
          </span>
          <span>Add RSS Source</span>
        </a>
      </p>
    </div>
    <!--Show the source of the pivotal rss feed-->
    <p class="menu-label">
      Information Source
    </p>
    <ul class="menu-list">
      <li>
        <a target="_blank" href="https://pivotal.io/security" class="heading"> Security Page </a>
      </li>
    </ul>
    <!--Menu Ends-->
  </aside>
</template>

<script>

  export default {
    name: 'menuList',
    // All the menu items are send as props to this component.
    props: [
      'menuItems', 'selectedItem'
    ],
    // All data for the rss menu.
    data: function() {
      return {
        menuTitle: 'Rss Feeder'
      }
    },
    methods: {
      // Check if the menu clicked is selected menu
      isActive: function(item) {
        return item === this.selectedItem
      },
      // Request for the RSS content
      requestRssContent: function(id) {
        this.$store.dispatch('pullRssContent', id)
      },
      // Send the event to the root component to open the modal
      openModal: function() {
        this.$emit('openModal')
      }
    },
  }

</script>

<style scoped>
  .button.is-outlined {
    margin-bottom: 10px;
  }
</style>
