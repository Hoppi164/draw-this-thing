<template>
  <div>
    <b-card :header="prompt" no-body class="text-center" footer-tag="footer">
      <div class="responsiveSize">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="border rounded border-dark w-100 h-100"
          viewBox="0 0 400 400"
        >
          <polyline
            v-for="(path, index) in paths"
            :key="index"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            fill="none"
            stroke-linejoin="round"
            :points="path.toString()"
          />
        </svg>
      </div>

      <template #footer>
        <button class="btn btn-dark w-100 mt-1" @click="downloadSvg">
          Download SVG
        </button>
      </template>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'ImageCard',
  props: {
    paths: {
      type: Array,
      default: () => [],
    },
    prompt: {
      type: String,
      default: () => '',
    },
  },

  methods: {
    downloadSvg() {
      const svgString = this.$el.firstChild.firstChild.firstChild.outerHTML
      alert(svgString)
    },
  },
}
</script>
<style scoped>
.responsiveSize {
  width: 100%;
  aspect-ratio: 1;
}
</style>
