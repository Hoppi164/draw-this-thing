<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <h5>Draw Here</h5>
        <DrawingPad :paths.sync="paths"></DrawingPad>
      </div>

      <div class="col-12 col-md-6">
        <h5>SVG Output</h5>
        <ImageCard :paths="simplifiedPaths"></ImageCard>
      </div>

      <div class="col-12 mt-2 mb-5">
        <div>
          <b-button v-b-toggle.debugInfo variant="primary" class="w-100"
            >View Debug Info</b-button
          >

          <b-collapse id="debugInfo" class="mt-2">
            <div class="row">
              <div class="col-4">
                <b-card header="Paths">
                  <pre class="card-text">
                <code>
                  {{paths}}
                </code>
              </pre>
                </b-card>
              </div>

              <div class="col-4">
                <b-card header="Simplified Paths">
                  <pre class="card-text">
                <code>
                  {{simplifiedPaths}}
                </code>
              </pre>
                </b-card>
              </div>

              <div class="col-4">
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
const simplify = require('simplify-path')
const tolerance = 2
export default {
  name: 'DrawPage',
  data() {
    return {
      paths: [],
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
}
</script>
