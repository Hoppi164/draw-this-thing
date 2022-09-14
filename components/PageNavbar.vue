<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Draw-This-Thing!</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="border-right">
            <b-nav-item to="/draw">Draw</b-nav-item>
            <b-nav-item to="/previous-games">Previous Games</b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar size="sm"></b-avatar>
              <em>Account</em>
            </template>

            <!-- If Logged In -->
            <b-dropdown-text v-if="isLoggedIn">
              <em>
                {{ user?.claims?.name }}
              </em>
            </b-dropdown-text>
            <b-dropdown-divider v-if="isLoggedIn"></b-dropdown-divider>
            <b-dropdown-item-button v-if="isLoggedIn" @click="logout">
              Sign Out
            </b-dropdown-item-button>

            <!-- If Not Logged In -->
            <b-dropdown-item v-if="!isLoggedIn" to="/login">
              Sign In
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageNavbar',
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),

    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },

  methods: {
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
