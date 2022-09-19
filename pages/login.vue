<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div v-if="!isLoggedIn">
          <div id="firebaseui-auth-container"></div>
          <div
            v-if="!prebuiltAuthIsLoaded"
            class="d-flex align-items-center justify-content-center position-absolute vh-100 vw-100"
          >
            <b-spinner label="Spinning"></b-spinner>
          </div>
        </div>

        <div v-else>
          <b-card class="mt-3" header="Logged In">
            <div class="row">
              <div class="col-12">
                <p>You are logged in as {{ user.email }}.</p>
              </div>
              <b-btn
                class="col-12 mt-2"
                variant="primary"
                @click="redirectToDrawPage()"
                >Start Drawing!</b-btn
              >
              <b-btn
                class="col-12 mt-2"
                variant="outline-danger"
                @click="logout"
                >Logout</b-btn
              >
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'firebaseui/dist/firebaseui.css'
import { mapState, mapGetters } from 'vuex'
let ui = null

export default {
  name: 'LoginPage',
  data() {
    return {
      prebuiltAuthIsLoaded: false,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),

    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  mounted() {
    const firebaseui = require('firebaseui')
    ui = new firebaseui.auth.AuthUI(this.$fireModule.auth())
    this.startFirebaseUI()
  },
  methods: {
    startFirebaseUI() {
      // Initialize the FirebaseUI Widget using Firebase.
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            return false
          },
          uiShown: () => {
            this.prebuiltAuthIsLoaded = true
          },
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        // signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
          this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>',
        // Privacy policy url.
        privacyPolicyUrl: '<your-privacy-policy-url>',
      }

      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig)
    },

    async logout() {
      try {
        await this.$fire.auth.signOut()
        this.prebuiltAuthIsLoaded = false
        this.startFirebaseUI()
      } catch (e) {
        alert(e)
      }
    },

    redirectToDrawPage() {
      this.$router.push('/draw')
    },
  },
}
</script>
