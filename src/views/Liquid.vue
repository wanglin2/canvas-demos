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

  // 正弦函数方式
  const useSinFunction = () => {
    const A = 10
    const ω = 3
    let φ = 0
    const B = 100
    const draw = () => {
      // 清空画布
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.save()
      // 修改坐标系
      ctx.translate(0, canvasHeight)
      ctx.scale(1, -1)

      ctx.beginPath()
      // 从左向右遍历x轴
      for (let x = 0; x < canvasWidth; x++) {
        // 根据正弦函数计算x对应的y
        const y = A * Math.sin(ω * degToRad(x) + φ) + B
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      // 连接画布右下角和左下角，然后闭合路径形成一个区域
      ctx.lineTo(canvasWidth, 0)
      ctx.lineTo(0, 0)
      ctx.closePath()
      ctx.fillStyle = '#63daad'
      ctx.fill()

      ctx.restore()

      φ += degToRad(5)
      requestAnimationFrame(draw)
    }
    draw()
  }
  // useSinFunction()

  // 三次贝塞尔曲线方式
  const useBezierCurve = () => {
    class Wave {
      constructor(opt) {
        // 画布宽度
        this.canvasWidth = opt.canvasWidth
        // 绘图上下文
        this.ctx = opt.ctx
        // 幅度，也就是控制点的y坐标
        this.amplitude = opt.amplitude || 20
        // 频率，也就是起点和终点的距离
        this.frequency = opt.frequency || 100
        // 上下偏移量
        this.yOffset = opt.yOffset || 0
        // 填充样式
        this.fillStyle = opt.fillStyle || '#63daad'
        // 水波数组
        this.waveList = []
        this.waveRandomList = []
        // 初始起点
        this.initStart = opt.initStart || 0
        // 速度
        this.step = opt.step || -1
      }

      draw() {
        this.waveList = []
        this.computeWaveList()
        this.drawWaveList()
        this.initStart += this.step
        // 水波向左移动需要复位起始点
        if (this.step < 0) {
          if (this.initStart <= -this.frequency) {
            this.initStart = 0
          }
        }
      }

      getRandom(min, max) {
        return (
          Math.floor(Math.random() * (max - min) + min) *
          (Math.random() > 0.5 ? 1 : -1)
        )
      }

      computeWaveList() {
        let actStart = this.initStart
        while (actStart > 0) {
          actStart -= this.frequency
        }
        for (
          let start = actStart;
          start < this.canvasWidth;
          start += this.frequency
        ) {
          this.waveList.push({
            // 起点
            p1: {
              x: start,
              y: this.yOffset
            },
            // 控制点1
            p2: {
              x: start + this.frequency / 2,
              y: this.yOffset + this.amplitude
            },
            // 控制点2
            p3: {
              x: start + this.frequency / 2,
              y: this.yOffset - this.amplitude
            },
            // 终点
            p4: {
              x: start + this.frequency,
              y: this.yOffset
            }
          })
        }
      }

      drawWaveList() {
        this.ctx.save()
        this.ctx.translate(0, canvasHeight)
        this.ctx.scale(1, -1)

        this.ctx.beginPath()
        this.waveList.forEach((item, index) => {
          if (index === 0) {
            this.ctx.moveTo(item.p1.x, item.p1.y)
          }
          this.ctx.bezierCurveTo(
            item.p2.x,
            item.p2.y,
            item.p3.x,
            item.p3.y,
            item.p4.x,
            item.p4.y
          )
        })
        this.ctx.lineTo(canvasWidth, 0)
        this.ctx.lineTo(0, 0)
        this.ctx.closePath()
        this.ctx.fillStyle = this.fillStyle
        this.ctx.fill()
        this.ctx.restore()
      }
    }

    const wave = new Wave({
      canvasWidth,
      ctx,
      yOffset: 100
    })
    const wave2 = new Wave({
      canvasWidth,
      ctx,
      yOffset: 95,
      fillStyle: '#8f12fe',
      initStart: -70,
      step: -2
    })
    const wave3 = new Wave({
      canvasWidth,
      ctx,
      yOffset: 80,
      fillStyle: '#ff974d',
      step: 2
    })
    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      wave.draw()
      wave2.draw()
      wave3.draw()
      requestAnimationFrame(draw)
    }
    draw()
  }
  useBezierCurve()
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
