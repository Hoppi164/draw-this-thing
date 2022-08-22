<template>
  <div>
    <div
      v-if="drawings?.length === 0"
      class="d-flex align-items-center justify-content-center position-absolute vh-100 vw-100"
    >
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-if="drawings?.length > 0">
      <div class="container">
        <div class="row">
          <div
            v-for="(drawing, index) in drawings"
            :key="index"
            class="col-12 col-md-6 col-xl-4"
          >
            <ImageCard
              :paths="drawing.paths"
              :prompt="drawing.prompt"
              class="mt-4"
            ></ImageCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PreviousGamesPage',

  computed: {
    ...mapGetters(['drawings']),
  },

  async mounted() {
    try {
      await this.$store.dispatch('bindDrawings')
    } catch (error) {
      this.$fire.analytics.logEvent('exception', {
        description: error,
      })
    }
  },
}
</script>
