<script setup>
import { useStore } from "../store/store.js";
import { ref } from "vue";

const store = useStore()

const lineWidth = ref(1)

const handleBrushesClick = (brush) => {
  store.context.lineWidth = brush || 1
  lineWidth.value = store.context.lineWidth
}

const toggleActiveClass = (brush) => {
  return lineWidth.value === brush ? 'btn-outline-primary' : 'btn-outline-secondary'
}
</script>

<template>
  <div class="brushes">
    <button
      :class="['brushes__type btn', toggleActiveClass(brush)]"
      @click="handleBrushesClick(brush)"
      v-for="brush in 5"
      :key="brush"
      type="button"
      :value="brush"
    >
      <div :style="{height: brush + 'px'}"></div>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.brushes {
  margin-top: 20px;

  @media (max-width: 1180px) {
    margin-right: 10px;
  }

  &__type {
    height: 30px;
    margin-bottom: 10px;
    width: 100%;
    transition: .3s all;

    @media (max-width: 1180px) {
      max-width: 250px;
      margin-bottom: 0;
      margin-top: 6px;
    }

    &:hover {
      background-color: transparent;
      box-shadow: 0 .125rem .25rem rgba(black, .4);
    }

    div {
      &:after {
        height: 100%;
        display: block;
        background: dimgray;
        content: '';
      }
    }
  }
}
</style>
