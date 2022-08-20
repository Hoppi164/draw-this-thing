<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="text-center">
        <h5>Draw a {{ prompt }}</h5>
        <DrawingPad :paths.sync="paths"></DrawingPad>
        <b-button variant="primary" class="w-100" @click="submitDrawing">
          Submit Drawing
        </b-button>
        <b-button v-b-toggle.debugInfo variant="secondary" class="w-100 mt-2">
          View Debug Info
        </b-button>
      </div>

      <div class="col-12 mt-2 mb-5">
        <div>
          <b-collapse id="debugInfo" class="mt-2">
            <div class="row">
              <div class="col-12 col-md-4">
                <b-card header="Paths">
                  <pre class="card-text">
                <code>
                  {{paths}}
                </code>
              </pre>
                </b-card>
              </div>

              <div class="col-12 col-md-4">
                <b-card header="Simplified Paths">
                  <pre class="card-text">
                <code>
                  {{simplifiedPaths}}
                </code>
              </pre>
                </b-card>
              </div>

              <div class="col-12 col-md-4">
                <b-card header="Compression Efficiency">
                  <div class="card-text">
                    <strong>Original Path:</strong>
                    <p>{{ originalSize }} Characters</p>

                    <strong>Simplified Path:</strong>
                    <p>{{ simplifiedSize }} Characters</p>

                    <strong>Compression Efficiency:</strong>
                    <p>
                      {{ compressionPercentage }}% the original size
                      <br />
                      <i>(Lower is better)</i>
                    </p>
                  </div>
                </b-card>
              </div>
            </div>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import randomPrompt from '~/mixins/randomPrompt.js'
const simplify = require('simplify-path')
const tolerance = 1

export default {
  name: 'DrawPage',
  mixins: [randomPrompt],
  data() {
    return {
      paths: [],
      prompt: 'xx',
    }
  },
  computed: {
    simplifiedPaths() {
      return this.paths.map((path) => simplify(path, tolerance))
    },

    originalSize() {
      return this.paths.toString().length
    },

    simplifiedSize() {
      return this.simplifiedPaths.toString().length
    },

    compressionPercentage() {
      if (this.originalSize === 0) {
        return 0
      }
      return ((this.simplifiedSize / this.originalSize) * 100).toFixed(0)
    },
  },
  created() {
    this.prompt = this.randomPrompt()
  },
  methods: {
    async submitDrawing() {
      try {
        await this.$fire.firestore.collection('drawings').add({
          prompt: this.prompt,
          paths: this.simplifiedPaths.map((path) => {
            return path.toString()
          }),
          user: 'anonymous - pre auth',
        })
        this.$fire.analytics.logEvent('join_group', {
          AnalyticsParameterGroupID: this.prompt,
        })
        alert(
          "I've saved your drawing in the database, I'm still working on the 'previous games' page, so check back in a few weeks"
        )
      } catch (error) {
        this.$fire.analytics.logEvent('exception', {
          description: error,
        })
      }
    },
  },
}
</script>
