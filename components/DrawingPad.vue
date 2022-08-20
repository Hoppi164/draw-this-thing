<template>
  <div>
    <div class="p-4 responsiveSize">
      <canvas
        id="canvas"
        class="border rounded border-dark h-100 w-100"
        height="400"
        width="400"
        style="touch-action: none"
        @touchstart="startPainting"
        @touchmove="draw"
        @touchend="finishedPainting"
        @mousedown="startPainting"
        @mousemove="draw"
        @mouseup="finishedPainting"
      >
      </canvas>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DrawingPad',
  props: {
    paths: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isPainting: false,
      canvas: null,
      ctx: null,
      currentPath: [],
    }
  },
  mounted() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ctx.webkitImageSmoothingEnabled = false
    this.ctx.mozImageSmoothingEnabled = false
    this.ctx.imageSmoothingEnabled = false
  },
  methods: {
    getX(e) {
      const clientX =
        (e.targetTouches?.[0]
          ? e.targetTouches?.[0].pageX
          : e.changedTouches?.[e.changedTouches.length - 1].pageX) || e.clientX
      const rect = this.canvas.getBoundingClientRect()
      return (
        ((clientX - rect.left) / (rect.right - rect.left)) * this.canvas.width
      )
    },
    getY(e) {
      const clientY =
        (e.targetTouches?.[0]
          ? e.targetTouches?.[0].pageY
          : e.changedTouches?.[e.changedTouches.length - 1].pageY) || e.clientY
      const rect = this.canvas.getBoundingClientRect()
      return (
        ((clientY - rect.top) / (rect.bottom - rect.top)) * this.canvas.height
      )
    },
    startPainting(e) {
      this.isPainting = true
      this.currentPath = []
      this.draw(e)
    },
    finishedPainting(e) {
      this.isPainting = false
      this.ctx.beginPath()
      const newPaths = this.paths
      newPaths.push(this.currentPath)
      this.updatePaths(newPaths)
    },
    draw(e) {
      if (!this.isPainting) {
        return
      }
      const newX = this.getX(e)
      const newY = this.getY(e)
      this.ctx.lineWidth = 2
      this.ctx.lineCap = 'round'
      this.ctx.lineTo(newX, newY)
      this.ctx.stroke()
      this.ctx.beginPath()
      this.ctx.moveTo(newX, newY)
      this.currentPath.push([newX, newY])
    },

    updatePaths(newValue) {
      this.$emit('update:paths', newValue)
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
