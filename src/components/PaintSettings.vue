<script setup>
import Palette from './Palette.vue'
import BrushesTypes from './BrushesTypes.vue'
import { colors } from "../../data/colors.js";

import { useStore } from "../store/store.js";

const store = useStore()

const clearCanvas = () => {
  store.context.clearRect(0, 0, store.canvas.width, store.canvas.height)
  store.canvas.style.backgroundColor = colors[colors.length - 2]
}

const saveDrawing = () => {
  const chosenFormat = confirm('Press "OK" for PNG format or "Cancel" for JPG')
  const imageNamePrompt = prompt('Please enter image name')
  let canvasDataURL
  let format

  if (chosenFormat) {
    canvasDataURL = store.canvas.toDataURL("image/png")
    format = 'png'
  } else {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = store.canvas.width;
    newCanvas.height = store.canvas.height;

    const newContext = newCanvas.getContext('2d');

    newContext.fillStyle = store.canvas.style.backgroundColor
    newContext.fillRect(0,0, store.canvas.width, store.canvas.height);
    newContext.drawImage(store.canvas, 0, 0);

    canvasDataURL = newCanvas.toDataURL("image/jpg");
    format = 'jpg'
  }

  const link = document.createElement('a')

  link.href = canvasDataURL
  link.download = imageNamePrompt ? `${imageNamePrompt}.${format}` :  `drawing.${format}`
  link.click()
}
</script>

<template>
  <div class="settings">
    <Palette />
    <BrushesTypes />
    <div class="settings__buttons">
      <button class="btn btn-outline-secondary" @click="clearCanvas">Clear</button>
      <button class="btn btn-outline-primary" @click="saveDrawing">Save</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    button {
      width: 100%;
    }
  }
}
</style>
