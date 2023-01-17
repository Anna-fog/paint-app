<script setup>
import { useStore } from "../store/store.js";

const store = useStore()

const updateCoordinates = (x, y) => {
  store.mouseX = Math.round(x - store.bounding?.left)
  store.mouseY = Math.round(y - store.bounding?.top)

  if (store.mouseX < 2
    || store.mouseY < 2
    || store.mouseX + 5 > store.canvas?.width
    || store.mouseY + 5 > store.canvas?.height) {
    store.isDrawing = false
  }
}

const handleMouseDown = (e) => {
  updateCoordinates(e.clientX, e.clientY)
  store.isDrawing = true

  store.context.beginPath()
  store.context.moveTo(store.mouseX, store.mouseY)
}

const handleMouseMove = (e) => {
  updateCoordinates(e.clientX, e.clientY)

  if (store.isDrawing) {
    store.context.lineCap = 'round'
    store.context.lineJoin = 'round'
    store.context.lineTo(store.mouseX, store.mouseY)
    store.context.stroke()
  }
}

const handleMouseUp = (e) => {
  updateCoordinates(e.clientX, e.clientY)
  store.isDrawing = false
}

</script>

<template>
  <canvas
    class="canvas"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    id="paint-canvas"
    width="900"
    height="550"
  ></canvas>
</template>

<style lang="scss" scoped>
.canvas {
  border: 1px solid gray;
  cursor: crosshair;
}
</style>
