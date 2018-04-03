<template>
  <!--The main template, that would be used by all the components-->
  <div id="app">
    <!--If the user is authenticated then send to the main page-->
    <div class="authentication-status" v-if="$auth.isAuthenticated()">
      <!--All the template would have the navbar, so adding it here-->
      <app-navbar v-on:logout="authLogout"></app-navbar>
      <!--Based on the router link clicked upload the specific component-->
      <router-view/>
    </div>
    <!--Else redirect them to the login page-->
    <div v-if="!$auth.isAuthenticated()">
      <app-login v-on:authenticate="auth('google')"
                 :unauthorizedLogin="unauthorizedLogin">
      </app-login>
    </div>
  </div>
</template>

<script>
  import navbar from './components/core/navbar'
  import login from './components/core/login'

  var qs = require('qs')
  const keys = require('./config/keys')
  export default {
    name: 'App',
    components: {
      'app-navbar': navbar,
      'app-login': login
    },
    data: function () {
      return {
        isAutenticated: this.$auth.isAuthenticated(),
        unauthorizedLogin: false
      }
    },
    methods: {
      // Logout method
      authLogout: function () {
        var this_ = this
        this.$auth.logout().then(() => {
          this_.$router.go('/')
        })
      },
      // Login Method
      auth: function (provider) {
        if (this.$auth.isAuthenticated()) {
          this.$auth.logout()
        }
        var this_ = this;
        this.$auth.authenticate(provider).then(function (authResponse) {
          this_.$router.go('/')
        }).catch(function (err) { // If the users hasn't logged in from a approved domain
          return this_.unauthorizedLogin = true
        })
      }
    }
  }
</script>

<style>
</style>
