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

  // 加载图片
  const loadImage = callback => {
    const img = new Image()
    img.onload = () => {
      callback(img)
    }
    img.src = (import.meta.env.PROD ? 'https://wanglin2.github.io/canvas-demos' : '') + '/pic2.webp'
  }

  loadImage(img => {
    // 绘制图片
    const drawImage = () => {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    }

    const useClip = () => {
      class Searchlight {
        constructor(opt) {
          // 画布宽高
          this.canvasWidth = opt.canvasWidth
          this.canvasHeight = opt.canvasHeight
          // 画布上下文
          this.ctx = opt.ctx
          // 探照灯中心点
          this.cx = opt.cx === undefined ? 0 : opt.cx
          this.cy = opt.cy === undefined ? 0 : opt.cy
          // 探照灯半径
          this.radius = opt.radius === undefined ? 70 : opt.radius
          // 速度
          this.speedX =
            opt.speedX === undefined ? this.createRandom(-5, 5) : opt.speedX
          this.speedY =
            opt.speedY === undefined ? this.createRandom(-5, 5) : opt.speedY
          this.radiusSpeed =
            opt.radiusSpeed === undefined
              ? this.createRandom(10, 20)
              : opt.radiusSpeed
          // 当前的动画类型
          this.currentAnimation = 'move'
          // 撞墙次数
          this.hitCount = opt.hitCount === undefined ? 2 : opt.hitCount
          // 动画结束回调函数
          this.done = opt.done || function () {}
          // 模糊的透明度
          this.opacity = 1
        }

        createRandom(min, max) {
          return Math.floor(Math.random() * (max - min) + min)
        }

        clip() {
          this.ctx.beginPath()
          this.ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2)
          this.ctx.clip()
        }

        move() {
          if (this.currentAnimation === 'move') {
            this.cx += this.speedX
            this.cy += this.speedY
            this.clip()
            let isHit = false
            if (
              this.cx - this.radius < 0 ||
              this.cx + this.radius > this.canvasWidth
            ) {
              isHit = true
              this.speedX = -this.speedX
            }
            if (
              this.cy - this.radius < 0 ||
              this.cy + this.radius > this.canvasHeight
            ) {
              isHit = true
              this.speedY = -this.speedY
            }
            if (isHit) {
              this.hitCount--
              if (this.hitCount <= 0) {
                this.currentAnimation = 'scale'
              }
            }
          } else if (this.currentAnimation === 'scale') {
            this.radius += this.radiusSpeed
            this.clip()
            if (
              this.radius >=
              Math.max(this.canvasWidth, this.canvasHeight) * 1.5
            ) {
              this.currentAnimation = 'opacity'
            }
          } else if (this.currentAnimation === 'opacity') {
            if (this.opacity - 0.1 >= 0) {
              this.opacity -= 0.1
            } else {
              this.opacity = 0
              this.currentAnimation = ''
              this.done()
            }
          }
        }

        addBlur() {
          this.ctx.save()
          this.ctx.globalAlpha = this.opacity
          const style = this.ctx.createRadialGradient(
            this.cx,
            this.cy,
            0,
            this.cx,
            this.cy,
            this.radius
          )
          style.addColorStop(0, 'rgba(0,0,0,0)')
          style.addColorStop(1, 'rgba(0,0,0,1)')
          this.ctx.fillStyle = style
          this.ctx.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2)
          this.ctx.fill()
          this.ctx.restore()
        }
      }
      let isDone = false
      const searchlight = new Searchlight({
        canvasWidth,
        canvasHeight,
        ctx,
        cx: canvasWidth / 2,
        cy: canvasHeight / 2,
        done() {
          isDone = true
        }
      })
      const draw = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)
        ctx.save()
        searchlight.move()
        drawImage()
        if (isDone) {
          ctx.restore()
          return
        }
        searchlight.addBlur()
        ctx.restore()
        requestAnimationFrame(draw)
      }
      draw()
    }
    useClip()

    // 线性渐变
    // const gradient = ctx.createLinearGradient(100, 0, 200, 0)
    // gradient.addColorStop(0, '#fff')
    // gradient.addColorStop(1, '#000')
    // ctx.fillStyle = gradient
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    // 径向渐变
    // const gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100)
    // gradient.addColorStop(0, '#fff')
    // gradient.addColorStop(1, '#000')
    // ctx.fillStyle = gradient
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight)
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
