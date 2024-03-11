<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvasWidth = 250
  const canvasHeight = 250
  const ratio = Math.max(window.devicePixelRatio, 2)

  const canvas = document.getElementById('canvas')
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const getImageData = (sx, sy, sw, sh) => {
    return ctx.getImageData(sx * ratio, sy * ratio, sw * ratio, sh * ratio)
  }
  const putImageData = (imageData, dx, dy, ox = 0, oy = 0, ow, oh) => {
    ow = ow === undefined ? imageData.width : ow * ratio
    oh = oh === undefined ? imageData.height : oh * ratio
    ctx.putImageData(
      imageData,
      dx * ratio,
      dy * ratio,
      ox * ratio,
      oy * ratio,
      ow,
      oh
    )
  }
  const createImageData = (w, h) => {
    return ctx.createImageData(w * ratio, h * ratio)
  }

  const example = () => {
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, 125, 125)

    // 左上角的四分之一矩形复制一份渲染到了右下角
    // const imageData = getImageData(0, 0, 125, 125)
    // putImageData(imageData, 125, 125)

    const imageData = getImageData(0, 0, 125, 125)
    putImageData(imageData, 125, 125, 0, 0, 125 / 2, 125 / 2)
  }
  // example()

  const example2 = () => {
    const getRandom = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min)
    }

    const imageData = createImageData(250, 250)
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = getRandom(0, 255)
      imageData.data[i + 1] = getRandom(0, 255)
      imageData.data[i + 2] = getRandom(0, 255)
      imageData.data[i + 3] = 255
    }
    putImageData(imageData, 0 , 0)
  }
  example2()
})
</script>

<style lang="less" scoped>
.canvasBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    border: 1px solid;
  }
}
</style>
