<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const width = 250
  const height = 250
  const ratio = window.devicePixelRatio
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  ctx.fillStyle = 'red'
  ctx.fillRect(0, 0, 100, 100)
  ctx.strokeStyle = 'blue'
  ctx.strokeRect(110, 110, 100, 100)

  // 简单的橡皮擦
  let isMousedown = false
  canvas.addEventListener('mousedown', () => {
    isMousedown = true
  })
  const rect = canvas.getBoundingClientRect()
  window.addEventListener('mousemove', e => {
    if (!isMousedown) return
    // 将鼠标位置转换成画布位置
    const ex = e.clientX - rect.left
    const ey = e.clientY - rect.top
    const x = ex - 25
    const y = ey - 25
    ctx.clearRect(x, y, 50, 50)
  })
  window.addEventListener('mouseup', () => {
    isMousedown = false
  })
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
