<template>
  <div>
    <div class="p-4">
      <canvas
        id="canvas"
        height="512"
        width="512"
        class="border rounded border-dark"
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
    svgPath: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isPainting: false,
      canvas: null,
      ctx: null,
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
      const rect = this.canvas.getBoundingClientRect()
      return (
        ((e.clientX - rect.left) / (rect.right - rect.left)) * this.canvas.width
      )
    },
    getY(e) {
      const rect = this.canvas.getBoundingClientRect()
      return (
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) * this.canvas.height
      )
    },
    startPainting(e) {
      this.isPainting = true
      const startPath = this.svgPath + `M${this.getX(e)} ${this.getY(e)} `
      this.draw(e, startPath)
    },
    finishedPainting(e) {
      this.isPainting = false
      const finishPath = this.svgPath + `M${this.getX(e)} ${this.getY(e)} `
      this.updateSvgPath(finishPath)
      this.ctx.beginPath()
    },
    draw(e, startPath = '') {
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
      this.updateSvgPath(`${startPath || this.svgPath}L${newX} ${newY} `)
    },
    updateSvgPath(newValue) {
      this.$emit('update:svgPath', newValue)
    },
  },
}
</script>
