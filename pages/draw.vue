<template>
  <div>
    <h5>Draw Here</h5>
    <DrawingPad :svg-path.sync="svgPath"></DrawingPad>

    <h5>Your Output SVG</h5>
    <ImageCard :svg-path="svgPath"></ImageCard>
  </div>
</template>

<script>
export default {
  name: 'DrawPage',
  data() {
    return {
      svgPath: '',
    }
  },
}
</script>
