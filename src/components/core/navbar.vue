<template>
  <!--Bulma Navbar: https://bulma.io/documentation/components/navbar/-->
  <nav class="navbar is-fixed-top">
    <!--Navbar brand information and also the burger button-->
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="title is-5">Pivotal CareLog</h1>
      </a>
      <div v-on:click=" burgerMenuActive = !burgerMenuActive" :class="{ 'is-active': burgerMenuActive }"
           class="navbar-burger burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!--Left side of the navbar, and also the navoption which will be part of the burger menu-->
    <div v-bind:class="{'is-active': burgerMenuActive }"  class="navbar-menu">
      <div class="navbar-start">
        <a v-for="navLeftItem in navLeftItems" class="navbar-item" :href="navLeftItem.route">
          {{ navLeftItem.item }}
        </a>
      </div>
    </div>
    <!--Right side of the navbar-->
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p v-for="navRightItem in navRightItems" class="control">
            <a :class="navRightItem.buttonClass" :href="navRightItem.route">
              <span class="icon">
                <i :class="navRightItem.icon"></i>
              </span>
              <span>
                {{ navRightItem.item }}
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
      name: "navbar",
      data: function() {
        return {
          // All Navbar left items
          navLeftItems: [{
            item: 'Customer',
            route: '/customer/'
          },{
            item: 'Products',
            route: '/products/'
          },{
            item: 'Security',
            route: '/security/'
          },{
            item: 'Life Cycle',
            route: '/lifecycle/'
          },{
            item: 'Useful Links',
            route: '/links/'
          }],
          // All navbar right items
          navRightItems: [{
            item: 'Report Bug',
            route: '#',
            buttonClass: 'button is-danger is-outlined',
            icon: 'fas fa-bug'
          },{
            item: 'Source Code',
            route: '#',
            buttonClass: 'button is-info is-outlined',
            icon: 'fab fa-github'
          },{
            item: 'Logout',
            route: '#',
            buttonClass: 'button is-success is-outlined',
            icon: 'fas fa-sign-out-alt'
          }],
          // The bool that checks if the navbar burger menu is active or not.
          burgerMenuActive: false
        }
      }
    }
</script>

<style scoped>

</style>
