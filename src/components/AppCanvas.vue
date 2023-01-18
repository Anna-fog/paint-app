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

const startDrawing = () => {
  store.isDrawing = true

  store.context.beginPath()
  store.context.moveTo(store.mouseX, store.mouseY)
}

const continueDrawing = () => {
  if (store.isDrawing) {
    store.context.lineCap = 'round'
    store.context.lineJoin = 'round'
    store.context.lineTo(store.mouseX, store.mouseY)
    store.context.stroke()
  }
}

const handleMouseDown = (e) => {
  updateCoordinates(e.clientX, e.clientY)
  startDrawing()
}

const handleMouseMove = (e) => {
  updateCoordinates(e.clientX, e.clientY)
  continueDrawing()
}

const handleMouseUp = (e) => {
  updateCoordinates(e.clientX, e.clientY)
  store.isDrawing = false
}

const handleTouchStart = (e) => {
  updateCoordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  startDrawing()
}

const handleTouchMove = (e) => {
  updateCoordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  continueDrawing()
}

const handleTouchEnd = (e) => {
  updateCoordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  store.isDrawing = false
}

</script>

<template>
  <canvas
    class="canvas"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    id="paint-canvas"
    width="900"
    height="550"
  ></canvas>
</template>

<style lang="scss" scoped>
.canvas {
  border: 1px solid gray;
  cursor: crosshair;
  touch-action: manipulation;

  @media (max-width: 1180px) {
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 200px);
  }
}
</style>
