<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
    <button id="launcherBtn">发射</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import tinycolor from 'tinycolor2'
import easingFunctions from '../easingFunctions'

onMounted(() => {
  const launcherBtn = document.getElementById('launcherBtn')
  const canvas = document.getElementById('canvas')
  const canvasWidth = 800
  const canvasHeight = 800
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const getRandom = (min, max) => {
    return Math.random() * (max - min) + min
  }

  const drawCircle = ({ opacity = 1, x, y, radius, color }) => {
    ctx.save()
    ctx.globalAlpha = opacity
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  }

  const deleteFromList = (list, target) => {
    const index = list.findIndex(item => {
      return item === target
    })
    list.splice(index, 1)
  }

  // 爆炸碎片
  class ExplosiveDebris {
    constructor(opt) {
      this.firework = opt.firework
      this.x = opt.x
      this.y = opt.y
      this.color = Math.random() > 0.2 ? opt.color : '#fff'
      this.radius = opt.radius || 2
      this.angle = getRandom(0, 2 * Math.PI)
      this.speed = opt.speed || getRandom(0.1, 4)
      this.vx = Math.cos(this.angle) * this.speed
      this.vy = Math.sin(this.angle) * this.speed
      this.g = opt.g || 0.98
      this.time = getRandom(0.5, 1)
      this.startTime = 0
      this.debrisCount = opt.debrisCount || 3
      this.secondBurst = opt.secondBurst || false
    }

    start() {
      this.startTime = Date.now()
    }

    update() {
      const duration = (Date.now() - this.startTime) / 1000
      const vy = this.vy - this.g * duration
      this.x += this.vx
      this.y += vy
      const progress = duration / this.time
      const opacity = progress > 0.7 ? 1 - 1 * progress : 1
      drawCircle({
        x: this.x,
        y: this.y,
        color: this.color,
        radius: this.radius,
        opacity: opacity
      })
      // 添加碎片
      if (this.debrisCount > 0 && Math.random() > 0.8) {
        this.debrisCount--
        this.firework.addDebris({
          x: this.x + getRandom(-2, 2),
          y: this.y + getRandom(-2, 2),
          color: this.color,
          radius: 0.5,
          g: 0.1
        })
      }
      return {
        x: this.x,
        y: this.y,
        isEnd: duration > this.time
      }
    }
  }

  // 爆炸器
  class Explosive {
    constructor(opt) {
      this.firework = opt.firework
      this.x = opt.x
      this.y = opt.y
      this.color = opt.color
      // 爆炸碎片列表
      this.debrisList = []
      // 爆炸碎片数量
      this.debrisNum = getRandom(50, 400)
      // 是否要二次爆炸
      this.secondBurst = opt.secondBurst || Math.random() > 0.8
      //是否是第一次爆炸
      this.isFirstBurst = true
    }

    start(debrisNum, opt = {}) {
      const num = debrisNum || this.debrisNum
      opt.x = opt.x || this.x
      opt.y = opt.y || this.y
      opt.speed = opt.speed || null
      opt.secondBurst = this.secondBurst && this.isFirstBurst
      for (let i = 0; i < num; i++) {
        const explosiveDebris = new ExplosiveDebris({
          firework: this.firework,
          color: this.color,
          ...opt
        })
        explosiveDebris.start()
        this.debrisList.push(explosiveDebris)
      }
      this.isFirstBurst = false
    }

    update() {
      const list = [...this.debrisList]
      list.forEach(debris => {
        const res = debris.update()
        if (res.isEnd) {
          deleteFromList(this.debrisList, debris)
          // 二次爆炸
          if (debris.secondBurst) {
            this.start(5, {
              x: res.x,
              y: res.y,
              speed: 1
            })
          }
        }
      })
      return {
        isEnd: list.length <= 0
      }
    }
  }

  // 碎片类
  class Debris {
    constructor(opt = {}) {
      // 颜色
      this.color = opt.color || '#fff'
      // 透明度
      this.opacity = getRandom(0.1, 0.5)
      // 半径
      this.radius = opt.radius || 1
      // 存在时间
      this.time = getRandom(0.5, 1)
      // 重力，px/s2
      this.g = opt.g || 0.98
      // 位置
      this.x = opt.x
      this.y = opt.y
      // 创建的时间
      this.startTime = 0
    }

    start() {
      this.startTime = Date.now()
    }

    update() {
      const duration = (Date.now() - this.startTime) / 1000
      this.y -= this.g * duration
      drawCircle({
        opacity: this.opacity,
        x: this.x,
        y: this.y,
        radius: this.radius,
        color: this.color
      })
      return {
        x: this.x,
        y: this.y,
        isEnd: duration > this.time
      }
    }
  }

  // 发射器类
  class Launcher {
    constructor(opt = {}) {
      // 烟花实例
      this.firework = opt.firework
      // 颜色
      this.color = opt.color
      // 初始位置
      this.x = opt.x || canvasWidth * getRandom(0.2, 0.8)
      this.y = opt.y || 0
      // 目标位置
      this.ty = canvasHeight * getRandom(0.6, 0.8)
      // 半径
      this.radius = opt.radius || getRandom(2, 5)
      // 发射的持续时间
      this.duration = opt.duration || getRandom(2000, 3500)
      // 发射时的时间
      this.startTime = 0
    }

    start() {
      this.startTime = Date.now()
    }

    update() {
      const x = this.x
      let y = easingFunctions.easeOutCubic(
        Date.now() - this.startTime,
        this.y,
        this.ty - this.y,
        this.duration
      )
      y = Math.min(y, this.ty)
      // 透明度变小
      const opacity = 1 - 1 * (y / this.ty)
      this.draw(x, y, opacity)
      // 添加碎片
      if (Math.random() > 0.7 && opacity >= 0.1) {
        this.firework.addDebris({
          x: x + getRandom(-2, 2),
          y
        }) // x坐标添加一段随机量
      }
      return {
        x,
        y,
        isEnd: y >= this.ty //返回true代表发射结束
      }
    }

    draw(x, y, opacity) {
      // 外圆，烟花的颜色
      drawCircle({
        opacity: opacity,
        x: x,
        y: y,
        radius: this.radius,
        color: this.color
      })
      // 内圆，白色
      drawCircle({
        opacity: opacity,
        x: x,
        y: y,
        radius: this.radius / 2,
        color: '#fff'
      })
    }
  }

  // 烟花类
  class Firework {
    constructor(opt = {}) {
      // 颜色
      this.color = opt.color || tinycolor.random().toHexString()
      // 发射器
      this.launcher = null
      // 爆炸器
      this.explosive = null
      // 烟花状态：waiting（等待发射）、launching（发射中）、bursting（爆炸中）、end（烟花结束）
      this.status = 'waiting'
      // 碎片列表
      this.debrisList = []
    }

    // 发射
    launch() {
      this.launcher = new Launcher({
        firework: this,
        color: this.color
      })
      this.launcher.start()
      this.status = 'launching'
    }

    // 爆炸
    burst({ x, y }) {
      this.explosive = new Explosive({
        firework: this,
        x,
        y,
        color: this.color
      })
      this.explosive.start()
    }

    // 更新
    update() {
      if (this.status === 'launching') {
        const res = this.launcher.update()
        if (res.isEnd) {
          this.status = 'bursting'
          this.burst(res)
        }
      } else if (this.status === 'bursting') {
        const res = this.explosive.update()
        if (res.isEnd) {
          this.status = 'end'
        }
      }
      // 更新碎片
      this.updateDebris()
    }

    // 添加碎片
    addDebris(opt = {}) {
      const debris = new Debris({
        ...opt,
        color: opt.color || this.color
      })
      debris.start()
      this.debrisList.push(debris)
    }

    // 更新碎片
    updateDebris() {
      const list = [...this.debrisList]
      list.forEach(debris => {
        const res = debris.update()
        if (res.isEnd) {
          deleteFromList(this.debrisList, debris)
        }
      })
    }

    isEnd() {
      return this.status === 'end'
    }
  }

  // 动画循环
  // 烟花列表
  const fireworkList = []
  const draw = () => {
    // 使用半透明清空画布，形成拖尾效果
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.save()

    // 修改坐标系
    ctx.translate(0, canvasHeight)
    ctx.scale(1, -1)

    const list = [...fireworkList]
    list.forEach(firework => {
      firework.update()
      if (firework.isEnd()) {
        deleteFromList(fireworkList, firework)
      }
    })

    ctx.restore()

    requestAnimationFrame(draw)
  }
  draw()

  // 烟花颜色列表
  const colorList = [
    '#ff0043',
    '#14fc56',
    '#1e7fff',
    '#e60aff',
    '#ffbf36',
    '#ffffff'
  ]
  // 发射烟花
  launcherBtn.addEventListener('click', () => {
    const firework = new Firework({
      color: colorList[Math.floor(Math.random() * colorList.length)]
    })
    fireworkList.push(firework)
    firework.launch()
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
    background-color: #000;
  }
}
</style>
