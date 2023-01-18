<script setup>
import PaintSettings from './components/PaintSettings.vue'
import AppCanvas from './components/AppCanvas.vue'
import { useStore } from "./store/store.js";

const store = useStore()

import { onMounted } from "vue";

onMounted(() => {
  store.canvas = document.getElementById("paint-canvas");
  store.context = store.canvas.getContext("2d");
  store.bounding = store.canvas.getBoundingClientRect();

  store.context.strokeStyle = 'black'
  store.context.lineWidth = 1
})
</script>

<template>
  <div class="paint-wrapper">
    <PaintSettings />
    <AppCanvas />
  </div>
</template>

<style scoped lang="scss">
.paint-wrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: flex-start;
  margin-top: 30px;

  @media (max-width: 1180px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin-top: 0;
  }
}
</style>
