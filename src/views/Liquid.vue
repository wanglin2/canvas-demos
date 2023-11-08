<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, toDisplayString } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvasWidth = 510
  const canvasHeight = 510
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
        // 画布高度
        this.canvasHeight = opt.canvasHeight
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
        // 步长
        this.step = opt.step || -1
        this.createWave()
      }

      createWaveData(start) {
        return {
          // 起点
          p1: {
            x: start,
            y: this.yOffset
          },
          // 控制点1
          p2: {
            x: start + this.frequency / 2,
            y: this.yOffset + this.amplitude + this.getRandom(-10, 10)
          },
          // 控制点2
          p3: {
            x: start + this.frequency / 2,
            y: this.yOffset - this.amplitude + this.getRandom(-10, 10)
          },
          // 终点
          p4: {
            x: start + this.frequency,
            y: this.yOffset
          }
        }
      }

      createWave() {
        for (let start = 0; start < this.canvasWidth; start += this.frequency) {
          this.waveList.push(this.createWaveData(start))
        }
      }

      draw() {
        // 更新水波位置
        this.waveList.forEach(item => {
          item.p1.x += this.step
          item.p2.x += this.step
          item.p3.x += this.step
          item.p4.x += this.step
        })
        // 过滤掉已经移除画布的水波
        this.waveList = this.waveList.filter(item => {
          if (this.step > 0) {
            // 向右移动的水波
            return item.p1.x < this.canvasWidth
          } else {
            // 向左移动的水波
            return item.p4.x > 0
          }
        })
        if (this.step > 0) {
          // 根据第一个水波的位置判断是否需要创建新的水波
          const firstWave = this.waveList[0]
          if (firstWave.p1.x > 0) {
            this.waveList.unshift(
              this.createWaveData(firstWave.p1.x - this.frequency)
            )
          }
        } else {
          // 根据最后一个水波的位置判断是否需要创建新的水波
          const lastWave = this.waveList[this.waveList.length - 1]
          if (lastWave.p4.x < this.canvasWidth) {
            this.waveList.push(this.createWaveData(lastWave.p4.x))
          }
        }
        this.drawWave()
      }

      getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      }

      drawWave() {
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
      canvasHeight,
      ctx,
      yOffset: 100
    })
    const wave2 = new Wave({
      canvasWidth,
      canvasHeight,
      ctx,
      yOffset: 90,
      fillStyle: '#8f12fe',
      step: -2
    })
    // const wave3 = new Wave({
    //   canvasWidth,
    //   canvasHeight,
    //   ctx,
    //   yOffset: 80,
    //   fillStyle: '#ff974d',
    //   step: 2
    // })

    const clip = () => {
      ctx.beginPath()
      ctx.arc(
        canvasWidth / 2,
        canvasHeight / 2,
        canvasWidth / 2,
        0,
        Math.PI * 2
      )
      ctx.stroke()
      ctx.clip()
    }

    const clip2 = () => {
      let path = new Path2D(
        'M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z'
      )
      ctx.lineWidth = 5
      ctx.strokeStyle = '#ff974d'
      ctx.stroke(path)
      ctx.clip(path)
    }

    clip2()
    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      wave.draw()
      wave2.draw()
      // wave3.draw()
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
