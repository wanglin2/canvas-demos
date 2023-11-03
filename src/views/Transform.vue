<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvasWidth = 500
  const canvasHeight = 500
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const radToDeg = r => {
    return r / (Math.PI / 180)
  }

  const degToRad = d => {
    return (Math.PI / 180) * d
  }

  // 1
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.translate(50, 50)
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.translate(-50, -50)
  // ctx.fillRect(25, 25, 50, 50)

  // 2
  // ctx.fillRect(0, 0, 50, 50)

  // ctx.save()
  // ctx.translate(50, 50)
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.restore()

  // ctx.fillRect(25, 25, 50, 50)

  // 3
  // ctx.fillRect(100, 100, 50, 50)
  // ctx.translate(125, 125)
  // ctx.rotate(Math.PI / 4)
  // ctx.fillRect(-25, -25, 50, 50)

  // 4
  // ctx.translate(0, canvasHeight)
  // ctx.scale(1, -1)
  // ctx.fillRect(0, 0, 50, 50)

  // ctx.transform(1, 0, 0, 1, 50, 100)
  // ctx.fillRect(0, 0, 50, 50)

  // ctx.transform(2, 0, 0, 3, 0, 0)
  // ctx.fillRect(0, 0, 50, 50)

  // const a = degToRad(45)
  // ctx.transform(Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), 0, 0)
  // ctx.fillRect(100, 100, 50, 50)

  // const a = degToRad(45)
  // ctx.transform(1, 0, Math.tan(a), 1, 0, 0)
  // ctx.fillRect(0, 0, 50, 50)

  // ctx.transform(1, 0, 0, 1, 50, 100)
  // ctx.fillRect(0, 0, 50, 50)
  // ctx.setTransform(2, 0, 0, 3, 0, 0)
  // ctx.fillRect(0, 0, 50, 50)

  ctx.transform(1, 0, 0, 1, 50, 100)
  ctx.fillRect(0, 0, 50, 50)
  ctx.resetTransform()
  ctx.transform(2, 0, 0, 3, 0, 0)
  ctx.fillRect(0, 0, 50, 50)

  // ctx.translate(50, 100)
  // ctx.scale(1, -1)
  // console.log(ctx.getTransform())  
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
