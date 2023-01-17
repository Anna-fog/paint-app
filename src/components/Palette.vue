<script setup>
import { colors } from "../../data/colors.js";
import { useStore } from "../store/store.js";
import { ref } from "vue";

const store = useStore()

const currentColor = ref(null)

const handlePaletteClick = (color) => {
  if (store.paletteFor === 'brush') {
    store.context.strokeStyle = color || 'black'
  } else if (store.paletteFor === 'bg') {
    store.canvas.style.backgroundColor = color
  }

  currentColor.value = color
}

const togglePaletteTarget = (target) => store.paletteFor = target

const toggleActiveClass = (type) => {
  return type === store.paletteFor ? 'btn-outline-primary' : 'btn-outline-secondary'
}

const activeColorClass = (color) => {
  return color === currentColor.value ? 'palette__color-active' : ''
}

</script>

<template>
  <div class="palette">
    <div class="palette__buttons">
      <button
        :class="['btn', toggleActiveClass('brush')]"
        @click="togglePaletteTarget('brush')"
      >
        Brush color
      </button>
      <button
        :class="['btn', toggleActiveClass('bg')]"
        @click="togglePaletteTarget('bg')"
      >
        Background color
      </button>
    </div>
    <div class="palette__colors">
      <button
        v-for="color in colors"
        :key="color"
        @click="handlePaletteClick(color)"
        type="button"
        :class="['palette__color', activeColorClass(color)]"
        :value="color"
        :style="{'background-color': color}"
      ></button>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.palette {
  max-width: 240px;

  &__buttons {
    display: flex;
    flex-direction: column;

    button {
      transition: .4s all;

      &:first-child {
        margin-bottom: 6px;
      }
    }
  }

  &__colors {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__color {
    width: 30px;
    height: 30px;
    border: 1px solid #d2d2d3;
    transition: .3s all;

    &-active {
      box-shadow: 0 .125rem .25rem rgba(black, .4);
      border-color: transparent;
      border-radius: 3px;
    }

    &:hover {
      box-shadow: 0 .125rem .25rem rgba(black, .4);
      border-color: transparent;
    }
  }
}

</style>
