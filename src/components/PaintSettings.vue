<script setup>
import Palette from './Palette.vue'
import BrushesTypes from './BrushesTypes.vue'
import { colors } from "../../data/colors.js";
import DetailsModal from './modals/DetailsModal.vue'

import { useStore } from "../store/store.js";

const store = useStore()

const clearCanvas = () => {
  store.context.clearRect(0, 0, store.canvas.width, store.canvas.height)
  store.canvas.style.backgroundColor = colors[colors.length - 2]

  closeSettings()
}

const saveDrawing = (format, name) => {
  let canvasDataURL

  if (format === 'png') {
    canvasDataURL = store.canvas.toDataURL("image/png")
  } else {
    const newCanvas = document.createElement("canvas");
    newCanvas.width = store.canvas.width;
    newCanvas.height = store.canvas.height;

    const newContext = newCanvas.getContext('2d');

    newContext.fillStyle = store.canvas.style.backgroundColor || 'white'
    newContext.fillRect(0,0, store.canvas.width, store.canvas.height);
    newContext.drawImage(store.canvas, 0, 0);

    canvasDataURL = newCanvas.toDataURL("image/jpg");
  }

  const link = document.createElement('a')

  link.href = canvasDataURL
  link.download = name ? `${name}.${format}` :  `drawing.${format}`
  link.click()

  closeSettings()
}

const closeSettings = () => {
  store.isSettingsModalOpen = false
}

</script>

<template>
  <Transition>
    <div v-show="store.isSettingsModalOpen" class="settings">
      <div class="settings__buttons">
        <div class="settings__close" @click="closeSettings">
          <img src="../assets/close.svg" alt="close settings">
        </div>
        <button class="btn btn-outline-secondary" @click="clearCanvas">
          Clear
        </button>
        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">
          Save
        </button>
      </div>
      <Palette />
      <BrushesTypes />
    </div>
  </Transition>

  <DetailsModal @save="saveDrawing" />
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 20px;
  position: absolute;
  right: 30px;
  bottom: 20px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 .125rem .25rem rgba(black, .4);
  background-color: #ffffff;
  z-index: 1;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-end;
    bottom: inherit;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60vw;

    .btn-outline-primary {
      &:hover {
        background-color: transparent;
        color: rgb(13, 110, 253);
      }
    }

    .btn-outline-secondary {
      &:hover {
        background-color: transparent;
        color: rgb(108, 117, 125);
      }
    }
  }

  @media (max-width: 360px) {
    width: calc(100% - 80px);
  }

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 560px) {
      flex-direction: row;
      width: 100%;
    }

    button {
      width: 100%;
    }
  }

  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border: 1px gray solid;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;

    img {
      width: 15px;
      height: 15px;
    }
  }
}

.v-enter-active, .v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
