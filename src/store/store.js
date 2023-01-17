import { defineStore } from 'pinia'

export const useStore = defineStore('store',  {
  state: () => ({
    mouseX: 0,
    mouseY: 0,

    isDrawing: false,
    paletteFor: 'brush',
    canvas: null,
    context: null,
    bounding: null,
  })
})