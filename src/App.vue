<template>
  <!--The main template, that would be used by all the components-->
  <div id="app">
    <!--If the user is authenticated then send to the main page-->
    <div class="authentication-status" v-if="$auth.isAuthenticated()">
      <!--All the template would have the navbar, so adding it here-->
      <app-navbar v-on:logout="authLogout"> </app-navbar>
      <transition name="fade" mode="out-in">
        <!--Based on the router link clicked upload the specific component-->
        <router-view/>
      </transition>
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
        if (!this.$auth.isAuthenticated()) {
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

  .animated {
    -webkit-animation-duration: 0.9s;
    animation-duration: 0.9s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .data-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255);
    color: #888;
    font-size: 14px;
  }

  .panel-danger {
    background-color: #ff3860;
    color: white;
  }

</style>
