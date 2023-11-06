<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import easingFunctions from '../easingFunctions'
import BezierEasing from 'bezier-easing'

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

  // let left = 0
  // const draw = () => {
  //   ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  //   ctx.fillRect(left, 100, 20, 20)
  //   left += 2
  //   window.requestAnimationFrame(draw)
  // }
  // draw()

  // let left = 0
  // const draw = () => {
  //   ctx.save()
  //   ctx.fillStyle = 'rgba(255,255,255,0.3)'
  //   ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  //   ctx.restore()
  //   ctx.fillRect(left, 100, 20, 20)
  //   left += 2
  //   window.requestAnimationFrame(draw)
  // }
  // draw()

  // let start = 0 // 动画开始的位置
  // let offset = 230 // 动画的距离
  // let target = start + offset// 动画的结束位置
  // let startTime = Date.now() // 动画开始的时间
  // let duration = 1000 // 动画的持续时间
  // let lastTime = Date.now()
  // const draw = () => {
  //   const curTime = Date.now()
  //   ctx.strokeText('fps: ' + (1000 / (curTime - lastTime)).toFixed(0), 10, 10)
  //   lastTime = curTime
  //   ctx.save()
  //   ctx.fillStyle = 'rgba(255,255,255,0.3)'
  //   ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  //   ctx.restore()
  //   // 时间进度
  //   const process = (Date.now() - startTime) / duration
  //   // 位置进度
  //   let x = start + offset * process
  //   x = Math.min(target, x)
  //   ctx.fillRect(x, 100, 20, 20)
  //   if (x >= target) return
  //   window.requestAnimationFrame(draw)
  // }
  // draw()

  // let start = 0
  // let offset = 230
  // let target = start + offset
  // let startTime = Date.now()
  // let duration = 1000
  // const draw = () => {
  //   ctx.save()
  //   ctx.fillStyle = 'rgba(255,255,255,0.3)'
  //   ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  //   ctx.restore()
  //   let x = easingFunctions.easeInOutCubic(
  //     Date.now() - startTime,
  //     start,
  //     offset,
  //     duration
  //   )
  //   x = Math.min(target, x)
  //   ctx.fillRect(x, 100, 20, 20)
  //   if (x >= target) {
  //     return
  //   }
  //   window.requestAnimationFrame(draw)
  // }
  // draw()

  let start = 0
  let offset = 230
  let target = start + offset
  let startTime = Date.now()
  let duration = 1000
  let easing = BezierEasing(.47,1.7,.72,-0.68)
  const draw = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    // 1
    let x1 = easingFunctions.easeInCubic(
      Date.now() - startTime,
      start,
      offset,
      duration
    )
    x1 = Math.min(target, x1)
    ctx.fillRect(x1, 50, 20, 20)
    // 2
    const process = easing(Math.min((Date.now() - startTime) / duration, 1))
    let x2 = process * offset + start
    x2 = Math.min(target, x2)
    ctx.fillRect(x2, 100, 20, 20)
    if (x2 >= target) {
      return
    }
    window.requestAnimationFrame(draw)
  }
  draw()
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
