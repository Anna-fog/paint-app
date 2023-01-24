<script setup>
import { draw } from "../../utils/draw.js";

const { startDrawing, continueDrawing, endDrawing } = draw()

</script>

<template>
  <canvas
    class="canvas"
    @mousedown="startDrawing"
    @mousemove="continueDrawing"
    @mouseup="endDrawing"
    @touchstart="startDrawing"
    @touchmove="continueDrawing"
    @touchend="endDrawing"
    id="paint-canvas"

  ></canvas>
</template>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  margin: 10px auto 0 auto;
  outline: 2px solid #cfcfcf;
  border-radius: 8px;
  cursor: crosshair;
  touch-action: manipulation;
}
</style>
