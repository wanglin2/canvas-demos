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

  const radToDeg = r => {
    return r / (Math.PI / 180)
  }

  const degToRad = d => {
    return (Math.PI / 180) * d
  }

  const drawArrow = (x, y, tx, ty, deg, l) => {
    const A = radToDeg(Math.atan2(ty - y, tx - x))
    const B = deg - A
    // 短线段1
    const l1 = l * Math.sin(degToRad(B))
    const l2 = l * Math.cos(degToRad(B))
    const x1 = tx - l2
    const y1 = ty + l1

    // 段线段2
    const B2 = 90 - A - deg
    const x2 = tx - l * Math.sin(degToRad(B2))
    const y2 = ty - l * Math.cos(degToRad(B2))

    // 创建路径
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(tx, ty)

    ctx.moveTo(tx, ty)
    ctx.lineTo(x1, y1)

    ctx.moveTo(tx, ty)
    ctx.lineTo(x2, y2)

    ctx.stroke()
  }
  drawArrow(30, 30, 200, 200, 30, 30)
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
