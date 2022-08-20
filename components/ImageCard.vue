<template>
  <div>
    <div class="p-4 responsiveSize">
      <!-- SVG Must Be First Child -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="border rounded border-dark w-100 h-100"
        viewBox="0 0 400 400"
      >
        <!-- <path
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          fill="none"
          stroke-linejoin="round"
          :d="svgPath + 'Z'"
        /> -->
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
      <button class="btn btn-dark w-100 mt-1" @click="downloadSvg">
        Download SVG
      </button>
    </div>
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
  },

  methods: {
    downloadSvg() {
      const svgString = this.$el.firstChild.firstChild.outerHTML
      alert(svgString)
      // alert(this.getOptimizedSvg(svgString))
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
