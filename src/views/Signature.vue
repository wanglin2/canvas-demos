<template>
  <div class="canvasBox">
    <div class="canvasWrap">
      <canvas id="canvas2"></canvas>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getStroke } from 'perfect-freehand'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvas2 = document.getElementById('canvas2')
  const canvasWidth = 500
  const canvasHeight = 500
  const ratio = Math.max(window.devicePixelRatio, 2)

  const initCanvas = canvas => {
    canvas.width = canvasWidth * ratio
    canvas.height = canvasHeight * ratio
    canvas.style.width = canvasWidth + 'px'
    canvas.style.height = canvasHeight + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    return ctx
  }
  const ctx = initCanvas(canvas)
  const ctx2 = initCanvas(canvas2)

  const rect = canvas.getBoundingClientRect()
  const windowToCanvas = e => {
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    return {
      x,
      y
    }
  }

  const average = (a, b) => (a + b) / 2

  const getTwoPointDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  // 增量绘制
  const demo = () => {
    let isMousedown = false
    let lastPos = {
      x: 0,
      y: 0
    }
    canvas.addEventListener('mousedown', e => {
      isMousedown = true
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      lastPos = windowToCanvas(e)
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      ctx.beginPath()
      ctx.moveTo(lastPos.x, lastPos.y)
      lastPos = windowToCanvas(e)
      ctx.lineTo(lastPos.x, lastPos.y)
      ctx.lineWidth = 5
      ctx.stroke()
    })
    window.addEventListener('mouseup', () => {
      isMousedown = false
    })
  }
  // demo()

  // 重新绘制
  const demo2 = () => {
    let isMousedown = false
    let pointList = []
    let lastPos = null
    canvas.addEventListener('mousedown', e => {
      isMousedown = true
      lastPos = windowToCanvas(e)
      pointList.push(lastPos)
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      const curPos = windowToCanvas(e)
      const distance = getTwoPointDistance(
        curPos.x,
        curPos.y,
        lastPos.x,
        lastPos.y
      )
      if (distance <= 4) {
        return
      }
      lastPos = curPos
      pointList.push(curPos)
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.beginPath()
      pointList.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.lineWidth = 5
      ctx.stroke()
    })
    window.addEventListener('mouseup', () => {
      isMousedown = false
      pointList = []
    })
  }
  // demo2()

  // 曲线连接
  const demo3 = () => {
    let isMousedown = false
    let pointList = []
    let lastPos = null
    canvas.addEventListener('mousedown', e => {
      isMousedown = true
      lastPos = windowToCanvas(e)
      pointList.push(lastPos)
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      const curPos = windowToCanvas(e)
      const distance = getTwoPointDistance(
        curPos.x,
        curPos.y,
        lastPos.x,
        lastPos.y
      )
      if (distance <= 4) {
        return
      }
      lastPos = curPos
      pointList.push(windowToCanvas(e))
      const len = pointList.length
      if (len < 4) {
        return
      }
      const lastControlPoint = {
        x: 0,
        y: 0
      }
      const lastEndPoint = {
        x: 0,
        y: 0
      }
      let a = pointList[0]
      let b = pointList[1]
      const c = pointList[2]

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)

      // 记录控制点和终点
      lastControlPoint.x = b.x
      lastControlPoint.y = b.y
      lastEndPoint.x = average(b.x, c.x)
      lastEndPoint.y = average(b.y, c.y)

      ctx.quadraticCurveTo(
        lastControlPoint.x,
        lastControlPoint.y,
        lastEndPoint.x,
        lastEndPoint.y
      )

      for (let i = 2, max = len - 1; i < max; i++) {
        a = pointList[i]
        b = pointList[i + 1]
        // 更新控制点和终点
        lastControlPoint.x =
          lastEndPoint.x + (lastEndPoint.x - lastControlPoint.x)
        lastControlPoint.y =
          lastEndPoint.y + (lastEndPoint.y - lastControlPoint.y)
        lastEndPoint.x = average(a.x, b.x)
        lastEndPoint.y = average(a.y, b.y)
        ctx.quadraticCurveTo(
          lastControlPoint.x,
          lastControlPoint.y,
          lastEndPoint.x,
          lastEndPoint.y
        )
      }

      ctx.lineWidth = 5
      ctx.stroke()
    })
    window.addEventListener('mouseup', () => {
      isMousedown = false
      pointList = []
    })
  }
  // demo3()

  const perfect = () => {
    let isMousedown = false
    let pointList = []
    let lineList = []
    let line = null
    canvas.addEventListener('mousedown', e => {
      isMousedown = true
      pointList = []
      pointList.push(windowToCanvas(e))
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      pointList.push(windowToCanvas(e))
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      lineList.forEach(item => {
        ctx.fill(item)
      })
      const points = getStroke(pointList, {
        size: 16,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        start: {
          cap: true,
          taper: 0,
          easing: t => t
        },
        end: {
          cap: true,
          taper: 0,
          easing: t => t
        }
      })
      const pathData = getSvgPathFromStroke(points)
      const path = new Path2D(pathData)
      line = path
      ctx.fill(path)
    })
    window.addEventListener('mouseup', () => {
      isMousedown = false
      lineList.push(line)
    })

    const getSvgPathFromStroke = points => {
      const len = points.length
      if (len < 4) {
        return ''
      }
      let a = points[0]
      let b = points[1]
      const c = points[2]
      let result = `M${a[0]},${a[1]} Q${b[0]},${b[1]} ${average(
        b[0],
        c[0]
      )},${average(b[1], c[1])} T`
      for (let i = 2, max = len - 1; i < max; i++) {
        a = points[i]
        b = points[i + 1]
        result += `${average(a[0], b[0])},${average(a[1], b[1])} `
      }
      result += 'Z'
      return result
    }
  }
  // perfect()

  // 两个canvas
  const perfect2 = () => {
    let isMousedown = false
    let pointList = []
    let lineList = []
    let line = null
    const clearCanvas = _ctx => {
      _ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }
    canvas.addEventListener('mousedown', e => {
      isMousedown = true
      pointList = []
      pointList.push(windowToCanvas(e))
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      pointList.push(windowToCanvas(e))
      clearCanvas(ctx)
      const points = getStroke(pointList, {
        size: 16,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
        start: {
          cap: true,
          taper: 0,
          easing: t => t
        },
        end: {
          cap: true,
          taper: 0,
          easing: t => t
        }
      })
      const pathData = getSvgPathFromStroke(points)
      const path = new Path2D(pathData)
      line = path
      ctx.fill(path)
    })
    window.addEventListener('mouseup', () => {
      isMousedown = false
      lineList.push(line)
      // 绘制完成后就将图形移到canvas2
      clearCanvas(ctx)
      clearCanvas(ctx2)
      lineList.forEach(item => {
        ctx2.fill(item)
      })
    })

    const getSvgPathFromStroke = points => {
      const len = points.length
      if (len < 4) {
        return ''
      }
      let a = points[0]
      let b = points[1]
      const c = points[2]
      let result = `M${a[0]},${a[1]} Q${b[0]},${b[1]} ${average(
        b[0],
        c[0]
      )},${average(b[1], c[1])} T`
      for (let i = 2, max = len - 1; i < max; i++) {
        a = points[i]
        b = points[i + 1]
        result += `${average(a[0], b[0])},${average(a[1], b[1])} `
      }
      result += 'Z'
      return result
    }
  }
  perfect2()
})
</script>

<style lang="less" scoped>
.canvasBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .canvasWrap {
    position: relative;
    width: 500px;
    height: 500px;
  }

  canvas {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid;
  }
}
</style>
