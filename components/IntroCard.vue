<template>
  <b-card title='Welcome to "Draw-This-Thing!"'>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button v-b-toggle.accordion-1 block variant="primary"
            >Step 1. Login</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-1"
          visible
          accordion="instructions-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <ul>
                <li>Click "Account" in the site navigation</li>
                <li>Click "Sign In"</li>
                <li>
                  (you can sign in with either username/password or with google)
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button v-b-toggle.accordion-2 block variant="primary"
            >Step 2. Draw</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-2"
          accordion="instructions-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <ul>
                <li>Click "Draw" in the site navigation</li>
                <li>Draw an image matching the prompt you have been given</li>
                <li>Click "Submit"</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button v-b-toggle.accordion-3 block variant="primary"
            >Step 3. Review</b-button
          >
        </b-card-header>
        <b-collapse
          id="accordion-3"
          accordion="instructions-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <b-card-text>
              <ul>
                <li>Click "Previous Games" in the site navigation</li>
                <li>View and Admire the drawings from yourself and others.</li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </b-card>
</template>

<script></script>
