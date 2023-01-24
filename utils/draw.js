import { useStore } from "../src/store/store.js";

export function draw() {
  const store = useStore()

  const updateCoordinates = (x, y) => {
    store.mouseX = Math.round(x - store.bounding?.left)
    store.mouseY = Math.round(y - store.bounding?.top)
  }

  const xCoordinate = (e) => {
    const isMouseEvent = e?.type === 'mousedown' || e?.type === 'mousemove' || e?.type === 'mouseup'
    return e?.type && isMouseEvent ? e.clientX : e.changedTouches[0].clientX
  }

  const yCoordinate = (e) => {
    const isMouseEvent = e?.type === 'mousedown' || e?.type === 'mousemove' || e?.type === 'mouseup'
    return e?.type && isMouseEvent ? e.clientY : e.changedTouches[0].clientY
  }

  const startDrawing = (e) => {
    updateCoordinates(xCoordinate(e), yCoordinate(e))

    store.isDrawing = true
    store.context.beginPath()
    store.context.moveTo(store.mouseX, store.mouseY)
  }

  const continueDrawing = (e) => {
    if (store.isDrawing) {
      updateCoordinates(xCoordinate(e), yCoordinate(e))

      store.context.lineTo(store.mouseX, store.mouseY)
      store.context.stroke()
    }
  }

  const endDrawing = (e) => {
    if (store.isDrawing) {
      updateCoordinates(xCoordinate(e), yCoordinate(e))
      store.isDrawing = false
    }
  }

  return { startDrawing, continueDrawing, endDrawing }
}

