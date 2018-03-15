<template>
  <!--Bulma Menu: https://bulma.io/documentation/components/menu/-->
  <aside class="menu">
    <!--All extra template goes here-->
    <slot name="menuTop"> </slot>
    <!-- Main Menu Label / Item -->
    <p class="menu-label">
      {{ menuTitle }}
    </p>
    <ul class="menu-list">
      <li v-for="menuItem in menuItems" >
        <a v-on:click="refreshContent(menuItem.pk)" :class="{'is-active': isActive(menuItem.fields.name)}" class="heading">
          {{ menuItem.fields.name }}
        </a>
      </li>
    </ul>
    <!--All extra template goes here-->
    <slot name="menuBottom"> </slot>
    <!--Show the source of the menu-->
    <p class="menu-label">
      Information Source
    </p>
    <ul class="menu-list">
      <li>
        <a target="_blank" :href="sourceUrl" class="heading" v-html="sourceTitle"></a>
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
      'menuItems', 'selectedItem', 'menuTitle', 'sourceUrl', 'sourceTitle'
    ],
    methods: {
      // Check if the menu clicked is selected menu
      isActive: function(item) {
        return item === this.selectedItem
      },
      // Request for the content
      refreshContent: function(id) {
        this.$emit('refreshContent', id)
      }
    },
  }

</script>

<style scoped>
  .button.is-outlined {
    margin-bottom: 10px;
  }
</style>
