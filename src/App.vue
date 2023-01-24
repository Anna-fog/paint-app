<script setup>
import PaintSettings from './components/PaintSettings.vue'
import AppCanvas from './components/AppCanvas.vue'
import { useStore } from "./store/store.js";
import { onMounted } from "vue";

const store = useStore()

const toggleSettings = () => {
  store.isSettingsModalOpen = !store.isSettingsModalOpen
}

const stopDrawing = () => {
  store.isDrawing = false
}

onMounted(() => {
  store.canvas = document.getElementById("paint-canvas");
  store.context = store.canvas.getContext("2d");
  store.bounding = store.canvas.getBoundingClientRect();

  store.context.strokeStyle = 'black'
  store.context.lineWidth = 1
  store.context.lineCap = 'round'
  store.context.lineJoin = 'round'

  const wrapperBounding = document.querySelector('.paint-wrapper').getBoundingClientRect()

  if (wrapperBounding.width > 1180) {
    store.canvas.width = window.innerWidth - 40
    store.canvas.height = window.innerHeight  * 0.85
  } else if (wrapperBounding.width <= 1180 && wrapperBounding.width > 680) {
    store.canvas.width = wrapperBounding.width - 20
    store.canvas.height = window.innerHeight  * 0.75
  } else if (wrapperBounding.width <= 680) {
    store.canvas.width = wrapperBounding.width - 20
    store.canvas.height = window.innerHeight  * 0.70
  }
})
</script>

<template>
  <div @mouseup="stopDrawing" @touchend="stopDrawing" style="height: 100%">
    <div class="paint-wrapper">
      <AppCanvas/>
      <PaintSettings />
      <img src="./assets/brush.png" alt="settings" class="settings-btn" @click="toggleSettings">
    </div>
  </div>
</template>

<style scoped lang="scss">
.paint-wrapper {
  position: relative;
  width: calc(100% - 20px);
  margin: 0 auto;
}

.settings-btn {
  position: absolute;
  bottom: -50px;
  right: 13px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  box-shadow: 0 .125rem .25rem rgba(black, .4);
  border-radius: 50%;
  transition: .3s all;

  &:hover {
    box-shadow: none;
  }

  @media (max-width: 560px) {
    &:hover {
      box-shadow: 0 .125rem .25rem rgba(black, .4);
    }
  }
}
</style>
