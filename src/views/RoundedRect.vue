<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvasWidth = 250
  const canvasHeight = 250
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const createShape = () => {
    ctx.beginPath()
    ctx.moveTo(100, 50)
    ctx.lineTo(150, 60)
    ctx.arc(50, 50, 50, Math.PI / 4, Math.PI)
    // ctx.closePath()

    ctx.strokeStyle = '#409eff'
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.setLineDash([5, 5])
    ctx.stroke()
  }

  const createRoundedRect = (x, y, width, height, borderRadius) => {
    ctx.beginPath()
    // 上
    ctx.moveTo(x + borderRadius, y)
    ctx.lineTo(x + width - borderRadius, y)

    // 右
    ctx.arc(
      x + width - borderRadius,
      y + borderRadius,
      borderRadius,
      (3 * Math.PI) / 2,
      0
    )
    ctx.lineTo(x + width, y + height - borderRadius)

    // 下
    ctx.arc(
      x + width - borderRadius,
      y + height - borderRadius,
      borderRadius,
      0,
      Math.PI / 2
    )
    ctx.lineTo(x + borderRadius, y + height)

    // 左
    ctx.arc(
      x + borderRadius,
      y + height - borderRadius,
      borderRadius,
      Math.PI / 2,
      Math.PI
    )
    ctx.lineTo(x, y + borderRadius)

    ctx.arc(
      x + borderRadius,
      y + borderRadius,
      borderRadius,
      Math.PI,
      (3 * Math.PI) / 2
    )

    ctx.stroke()
  }

  function createRoundedRect2(x, y, width, height, borderRadius) {
    ctx.beginPath()
    // 上
    ctx.moveTo(x + borderRadius, y)
    ctx.lineTo(x + width - borderRadius, y)

    // 右
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius)
    ctx.lineTo(x + width, y + height - borderRadius)

    // 下
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - borderRadius,
      y + height
    )
    ctx.lineTo(x + borderRadius, y + height)

    // 左
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius)
    ctx.lineTo(x, y + borderRadius)

    ctx.quadraticCurveTo(x, y, x + borderRadius, y)

    ctx.stroke()
  }

  createRoundedRect(50, 50, 100, 100, 50)
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
