<template>
  <div>
    <div class="p-4">
      <!-- SVG Must Be First Child -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="512"
        width="512"
        class="border rounded border-dark"
      >
        <path
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          fill="none"
          stroke-linejoin="round"
          :d="svgPath + ' Z'"
        />
      </svg>
    </div>
    <button class="btn btn-dark ml-4" @click="downloadSvg">Download SVG</button>
  </div>
</template>
<script>
export default {
  name: 'ImageCard',
  props: {
    svgPath: {
      type: String,
      default: () => '',
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
