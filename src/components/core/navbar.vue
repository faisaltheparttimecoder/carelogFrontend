<template>
  <!--Bulma Navbar: https://bulma.io/documentation/components/navbar/-->
  <nav class="navbar is-white is-fixed-top is-black">

    <!--Navbar brand information and also the burger button-->
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="title is-5 has-text-white">Pivotal CareLog</h1>
      </a>
      <div v-on:click=" burgerMenuActive = !burgerMenuActive" :class="{ 'is-active': burgerMenuActive }"
           class="navbar-burger burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <!--Left side of the navbar, and also the navoption which will be part of the burger menu-->
    <div v-bind:class="{'is-active': burgerMenuActive }" class="navbar-menu">
      <div class="navbar-start">
        <div v-for="(LeftItems, index) in navLeftItems" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <b-icon class="media-left" :pack="LeftItems.iconpack" :icon="LeftItems.icon"></b-icon>
            {{ index }}
          </a>
          <div class="navbar-dropdown is-boxed">
            <router-link v-for="(LeftItem, index) in LeftItems.items" class="navbar-item"
               :class="{'is-active': $store.state.activeNavbar === LeftItem.item}" :to="LeftItem.route" :key="index">
              <div class="media">
                <b-icon class="media-left" :pack="LeftItem.iconpack" :icon="LeftItem.icon"></b-icon>
                <div class="media-content">
                  <h3>{{ LeftItem.item }}</h3>
                  <small>{{ LeftItem.description }}</small>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!--Right side of the navbar-->
    <div class="navbar-end">
      <div v-for="(rightItems, index) in navRightItems" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          <b-icon class="media-left" :pack="rightItems.iconpack" :icon="rightItems.icon"></b-icon>
          {{ connectedUser }}
        </a>
        <div class="navbar-dropdown is-right">
          <!--Version Information-->
          <div class="navbar-item">
            <div class="media">
              <b-icon class="media-left" pack="fas" icon="code-branch"></b-icon>
              <div class="media-content">
                <h3>Version</h3>
                <a href="https://github.com/faisaltheparttimecoder/carelogFrontend/releases" target="_blank">
                  <small>Carelog Release: {{ version }}</small>
                </a>
              </div>
            </div>
          </div>
          <hr class="navbar-divider">
          <!--Menu Items-->
          <a v-for="rightItem in rightItems.items" class="navbar-item is-disabled" :href="rightItem.route"
             target="_blank">
            <div class="media">
              <b-icon class="media-left" :pack="rightItem.iconpack" :icon="rightItem.icon"></b-icon>
              <div class="media-content">
                <h3>{{ rightItem.item }}</h3>
                <small>{{ rightItem.description }}</small>
              </div>
            </div>
          </a>
          <!--Logged out option-->
          <a v-on:click="$emit('logout')" class="navbar-item">
            <div class="media">
              <b-icon class="media-left" pack="fas" icon="sign-out-alt"></b-icon>
              <div class="media-content">
                <h3>Logout</h3>
                <small>Sign out of carelog app</small>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
  export default {
    name: "navbar",

    // All the data for the components
    data: function () {
      return {
        version: '1.1',
        // All Navbar left items
        navLeftItems: {
          Home: {
            iconpack: 'fas',
            icon: 'home',
            items: [{
              item: 'Main',
              route: '/',
              description: 'BCS Home Page',
              iconpack: 'fab',
              icon: 'font-awesome-flag'
            }, {
              item: 'Engagement & Pricing',
              route: '/engagement',
              description: 'BCS Engagement & Pricing',
              iconpack: 'fas',
              icon: 'microphone'
            }, {
              item: 'Team',
              route: '/team',
              description: 'Meet the Team',
              iconpack: 'fas',
              icon: 'graduation-cap'
            }]
          },
          Customers: {
            iconpack: 'fas',
            icon: 'users',
            items: [{
              item: 'Dashboard',
              route: '/dashboard/',
              description: 'Cust. at-a-glance views of KPIs',
              iconpack: 'fas',
              icon: 'table'
            }, {
              item: 'Environment',
              route: '/environment/',
              description: 'Cust. Environment Information',
              iconpack: 'fab',
              icon: 'envira'
            }, {
              item: 'Tickets',
              route: '/tickets/',
              description: 'Cust. Tickets & Agent Notes',
              iconpack: 'fas',
              icon: 'ticket-alt'
            }, {
              item: 'Timeline',
              route: '/timeline/',
              description: 'Cust. Timeline of Activities',
              iconpack: 'fas',
              icon: 'sitemap'
            }]
          },
          Pivotal: {
            iconpack: 'far',
            icon: 'building',
            items: [{
              item: 'Products',
              route: '/products/',
              description: 'Pivotal Products General Availability',
              iconpack: 'fab',
              icon: 'product-hunt'
            }, {
              item: 'Security',
              route: '/security/',
              description: 'Pivotal Security vulnerabilities',
              iconpack: 'fas',
              icon: 'user-secret'
            }, {
              item: 'Life Cycle',
              route: '/lifecycle/',
              description: 'Pivotal Product Life Cycle Matrix',
              iconpack: 'fas',
              icon: 'heartbeat'
            }],
          },
          Extras: {
            iconpack: 'fab',
            icon: 'hire-a-helper',
            items: [{
              item: 'Links',
              route: '/links/',
              description: 'General & Useful Links',
              iconpack: 'fas',
              icon: 'link'
            }]
          },
        },
        // Right Side NavBar
        navRightItems: {
          anonymous: {
            iconpack: 'fas',
            icon: 'user',
            items: [{
              item: 'Report Bug',
              route: 'https://github.com/faisaltheparttimecoder/carelogFrontend/issues',
              description: 'Let us know of any issues',
              iconpack: 'fas',
              icon: 'bug'
            }, {
              item: 'Source Code',
              route: 'https://github.com/faisaltheparttimecoder/carelogFrontend',
              description: 'View the source code',
              iconpack: 'fab',
              icon: 'github'
            }]
          }
        },
        // The bool that checks if the navbar burger menu is active or not.
        burgerMenuActive: false
      }
    },
    computed: {
      connectedUser: function () {
        this.$store.dispatch('loggedUserAction')
        // Lets check if the users token still works
        if (this.$store.state.unauthorizedOrExpireToken) { // nope its expired, log him out
          this.$emit('logout')
        } else {
          return this.$store.state.loggedUser
        }
      }
    }
  }
</script>

<style scoped>
  a {
    color: black;
  }
</style>
