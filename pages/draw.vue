<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h5>Draw Here</h5>
        <DrawingPad :svg-path.sync="svgPath"></DrawingPad>
      </div>

      <div class="col-6">
        <h5>Your Output SVG</h5>
        <ImageCard :svg-path="svgPath"></ImageCard>
      </div>
    </div>
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
