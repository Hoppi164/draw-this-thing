<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Draw-This-Thing!</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="border-right">
            <b-nav-item to="/draw">Draw</b-nav-item>
            <b-nav-item to="/vote">Vote</b-nav-item>
            <b-nav-item to="/previous-games">Previous Games</b-nav-item>
          </b-navbar-nav>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>

            <b-dropdown-item href="#">Sign In (Coming Soon)</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out (Coming Soon)</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
