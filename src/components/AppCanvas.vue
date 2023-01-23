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
    store.context.lineTo(store.mouseX, store.mouseY)
    store.context.stroke()
  }
}

const handleStart = (e) => {
  if (e.type === 'mousedown') {
    updateCoordinates(e.clientX, e.clientY)
  } else if (e.type === 'touchstart') {
    updateCoordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  }

  startDrawing()
}

const handleMove = (e) => {
  if (e.type === 'mousemove') {
    updateCoordinates(e.clientX, e.clientY)
  } else if (e.type === 'touchmove') {
    updateCoordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  }

  continueDrawing()
}

const handleEnd = (e) => {
  if (e.type === 'handleEnd') {
    updateCoordinates(e.clientX, e.clientY)
  } else if (e.type === 'touchend') {
    updateCoordinates(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
  }
  store.isDrawing = false
}

</script>

<template>
  <canvas
    class="canvas"
    @mousedown="handleStart"
    @mousemove="handleMove"
    @mouseup="handleEnd"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
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
