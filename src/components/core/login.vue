<template>
  <div>
    <section class="hero is-info is-large">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <h1 class="title white">
              Carelog
            </h1>
            <h2 class="subtitle">
              Please sign in
            </h2>
            <b-message v-if="unauthorizedLogin" title="UnAuthorized User" type="is-danger" has-icon>
              {{ unAuthorizedUserMessage }}
            </b-message>
            <h2 class="subtitle">
              <i class="fas fa-spinner fa-pulse" v-if="loginProgress"></i>
              <span class="subtitle"> {{ loginProgressMessage }} </span>
            </h2>
            <button type="button" class="google-button" v-on:click="$emit('authenticate')">
              <span class="google-button__icon google-button__icon--plus">
                <svg viewBox="0 0 93 60" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.12 28.862C.375 13.725 14.29.47 29.428.974c7.253-.337 14.07 2.82 19.626 7.252-2.37 2.694-4.826 5.29-7.45 7.716-6.677-4.615-16.174-5.934-22.852-.603-9.552 6.606-9.987 22.206-.798 29.318 8.936 8.11 25.826 4.083 28.295-8.333-5.597-.084-11.21 0-16.806-.182-.013-3.34-.027-6.678-.013-10.016 9.357-.028 18.714-.043 28.085.028.56 7.856-.477 16.217-5.303 22.712-7.31 10.283-21.983 13.285-33.43 8.88C7.29 53.37-.848 41.235.12 28.862zm75.643-11.167h8.347c.014 2.792.028 5.598.056 8.39 2.792.028 5.598.028 8.39.056v8.348c-2.792.028-5.584.042-8.39.07-.028 2.805-.042 5.597-.056 8.39h-8.36c-.03-2.793-.03-5.585-.057-8.376l-8.39-.084V26.14c2.793-.027 5.584-.04 8.39-.056.014-2.805.042-5.597.07-8.39z"
                    fill="#DC4E41"/></svg>
              </span>
              <span class="google-button__text">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    props: [
      'unauthorizedLogin', 'loginProgress', 'loginProgressMessage'
    ],
    data: function () {
      return {
        unAuthorizedUserMessage: "Sorry, Your email address isn't authorized to use this website."
      }
    }
  }
</script>

<style>
  html {
    background: black;
  }

  .hero.is-info {
    margin-top: 3%;
    background: linear-gradient(rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)), url('https://unsplash.it/1200/900?random') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  .google-button {
    cursor: pointer;
    height: 40px;
    border-width: 0;
    background: white;
    color: #737373;
    border-radius: 5px;
    white-space: nowrap;
    -webkit-box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
    box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
    -webkit-transition-property: background-color, -webkit-box-shadow;
    transition-property: background-color, -webkit-box-shadow;
    transition-property: background-color, box-shadow;
    transition-property: background-color, box-shadow, -webkit-box-shadow;
    -webkit-transition-duration: 150ms;
    transition-duration: 150ms;
    -webkit-transition-timing-function: ease-in-out;
    transition-timing-function: ease-in-out;
    padding: 0;
  }

  .google-button:focus,
  .google-button:hover {
    -webkit-box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
  }

  .google-button:active {
    background-color: #e5e5e5;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-transition-duration: 10ms;
    transition-duration: 10ms;
  }

  .google-button__icon {
    display: inline-block;
    vertical-align: middle;
    margin: 8px 0 8px 8px;
    width: 18px;
    height: 18px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .google-button__icon--plus {
    width: 27px;
  }

  .google-button__text {
    display: inline-block;
    vertical-align: middle;
    padding: 0 24px;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', arial, sans-serif;
  }
</style>
