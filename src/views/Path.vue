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
  // createShape()

  const createMultiShape = () => {
    ctx.beginPath()
    ctx.moveTo(100, 50)
    ctx.lineTo(150, 60)
    ctx.strokeStyle = '#409eff'
    ctx.lineWidth = 5
    ctx.setLineDash([5, 5])
    ctx.stroke()

    ctx.save()

    ctx.beginPath()
    ctx.moveTo(150, 150)
    ctx.lineTo(150, 80)
    ctx.quadraticCurveTo(30, 40, 60, 70)
    ctx.strokeStyle = '#FFC942'
    ctx.lineWidth = 2
    ctx.setLineDash([])
    ctx.stroke()

    ctx.restore()

    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2)
    ctx.stroke()
  }
  // createMultiShape()

  const path2d = () => {
    const p1 = new Path2D()
    p1.moveTo(80, 80)
    p1.lineTo(120, 120)

    const p2 = new Path2D()
    p2.rect(50, 50, 120, 120)
    
    p1.addPath(p2)

    ctx.stroke(p1)
  }
  path2d()
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
