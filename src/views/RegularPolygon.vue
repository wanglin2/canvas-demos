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

  const degToRad = d => {
    return (Math.PI / 180) * d
  }

  const drawRegularPolygon = (n, x, y, r) => {
    ctx.beginPath()
    const a = (Math.PI * 2) / n
    for (let i = 0; i < n; i++) {
      const dx = Math.cos(a * i) * r
      const dy = Math.sin(a * i) * r
      const tx = x + dx
      const ty = y + dy
      ctx.lineTo(tx, ty)
    }
    ctx.closePath()
    ctx.stroke()
  }
  //   drawRegularPolygon(8, 200, 200, 100)

  const drawRegularPolygon2 = (n, x, y, r) => {
    const a = (Math.PI * 2) / n
    ctx.beginPath()
    ctx.translate(x, y)
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        ctx.moveTo(r, 0)
      } else {
        ctx.rotate(a)
        ctx.lineTo(r, 0)
      }
    }
    ctx.closePath()
    ctx.stroke()
  }
  drawRegularPolygon2(8, 250, 250, 100)
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
