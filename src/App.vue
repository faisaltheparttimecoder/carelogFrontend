<template>
  <div id="app">
    <!--If the user is authenticated then send to the main page-->
    <div class="authentication-status" v-if="$auth.isAuthenticated()">
      <!--loading spinner-->
      <app-loading :loading="this.$store.state.appLoading"> </app-loading>
      <!--Notification components-->
      <vue-snotify> </vue-snotify>
      <!--All the template would have the navbar, so adding it here-->
      <app-navbar v-on:logout="authLogout"> </app-navbar>
      <!--Based on the router link clicked upload the specific component-->
      <router-view :class="{'toggleOpacity': this.$store.state.appLoading}"/>
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
  import loading from './components/core/loading'
  import navbar from './components/core/navbar'
  import login from './components/core/login'
  export default {
    name: 'App',
    components: {
      'app-navbar': navbar,
      'app-login': login,
      'app-loading': loading
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
        }).catch(function (error) { // If the users hasn't logged in from a approved domain
          return this_.unauthorizedLogin = true
        })
      }
    }
  }
</script>

<style>
  /* Loading page opacity */
  .toggleOpacity {
    opacity: 0.3
  }
  /* Overwrite the snotify styling */
  .snotifyToast {
    border: 1px solid black;
    -webkit-box-shadow: 5px 7px 10px 0px rgba(0,0,0,0.26);
    -moz-box-shadow: 5px 7px 10px 0px rgba(0,0,0,0.26);
    box-shadow: 5px 7px 10px 0px rgba(0,0,0,0.26);
  }
  .snotifyToast__title {
    display: block;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
  .snotifyToast__body {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    color: #4a4a4a;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
  .snotifyToast__progressBar__percentage {
    background-color: white;
  }
  /* Adjust the location of the no content message, mostly on dashboard */
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
</style>
