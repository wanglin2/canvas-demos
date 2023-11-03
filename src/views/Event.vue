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

  const isPointInPath = (x, y, path) => {
    x = x * ratio
    y = y * ratio
    return path ? ctx.isPointInPath(path, x, y) : ctx.isPointInPath(x, y)
  }

  const isPointInStroke = (x, y, path) => {
    x = x * ratio
    y = y * ratio
    return path ? ctx.isPointInStroke(path, x, y) : ctx.isPointInStroke(x, y)
  }

  // 1
  //   ctx.beginPath()
  //   ctx.moveTo(20, 20)
  //   ctx.lineTo(50, 20)
  //   ctx.lineTo(50, 50)
  //   ctx.lineTo(20, 50)
  //   ctx.closePath()
  //   ctx.stroke()
  //   console.log(isPointInPath(30, 40))

  // 2
  //   ctx.beginPath()
  //   ctx.moveTo(100, 120)
  //   ctx.lineTo(150, 130)
  //   ctx.lineTo(170, 200)
  //   ctx.stroke()
  //   console.log(isPointInPath(140, 140))

  // 3
  //   ctx.save()
  //   ctx.beginPath()
  //   ctx.moveTo(100, 100)
  //   ctx.lineTo(200, 100)
  //   ctx.lineTo(200, 200)
  //   ctx.lineTo(100, 200)
  //   ctx.closePath()
  //   ctx.lineWidth = 20
  //   ctx.stroke()
  //   console.log(isPointInPath(99, 99), isPointInStroke(99, 99))
  //   ctx.restore()

  //   ctx.beginPath()
  //   ctx.moveTo(100, 100)
  //   ctx.lineTo(200, 100)
  //   ctx.lineTo(200, 200)
  //   ctx.lineTo(100, 200)
  //   ctx.closePath()
  //   ctx.strokeStyle = 'red'
  //   ctx.stroke()

  // 4
  //   ctx.beginPath()
  //   ctx.moveTo(0, 10)
  //   ctx.lineTo(100, 10)
  //   ctx.lineWidth = 20
  //   ctx.setLineDash([10, 10])
  //   ctx.stroke()
  //   console.log(isPointInStroke(5, 10), isPointInStroke(15, 10))

  // 5
  //   ctx.save()
  //   ctx.beginPath()
  //   ctx.moveTo(10, 10)
  //   ctx.lineTo(100, 10)
  //   ctx.lineCap = 'round'
  //   ctx.lineWidth = 20
  //   ctx.stroke()
  //   console.log(isPointInStroke(5, 10))
  //   ctx.restore()

  //   ctx.beginPath()
  //   ctx.moveTo(10, 10)
  //   ctx.lineTo(100, 10)
  //   ctx.lineWidth = 20
  //   ctx.strokeStyle = 'red'
  //   ctx.stroke()

  // 6
  //   ctx.fillRect(0, 0, 100, 100)
  //   console.log(isPointInPath(50, 50), isPointInStroke(0, 0))

  // 7
  //   ctx.font = '100px 黑体'
  //   ctx.strokeText('Canvas实战', 0, 70)
  //   ctx.fillRect(10, 10, 5, 5)
  //   console.log(isPointInPath(10, 10), isPointInStroke(10, 10))

  // 8
  //   const img = new Image()
  //   img.onload = () => {
  //     ctx.drawImage(img, 0, 0)
  //     console.log(isPointInPath(10, 10))
  //   }
  //   img.src = '/big.jpg'

  // 9
  const path = new Path2D()
  path.moveTo(0, 0)
  path.lineTo(100, 0)
  path.lineTo(100, 100)
  path.lineTo(0, 100)
  path.closePath()

  ctx.fill(path)
  console.log(isPointInPath(10, 10, path), isPointInStroke(0, 0, path))
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
