<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getStroke } from 'perfect-freehand'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const width = 500
  const height = 500
  const ratio = window.devicePixelRatio
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const rect = canvas.getBoundingClientRect()
  const transformPos = e => {
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lastPos = transformPos(e)
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      ctx.beginPath()
      ctx.moveTo(lastPos.x, lastPos.y)
      lastPos = transformPos(e)
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
      lastPos = transformPos(e)
      pointList.push(lastPos)
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      const curPos = transformPos(e)
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
      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
      lastPos = transformPos(e)
      pointList.push(lastPos)
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      const curPos = transformPos(e)
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
      pointList.push(transformPos(e))
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

      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
    canvas.addEventListener('mousedown', e => {
      isMousedown = true
      pointList = []
      pointList.push(transformPos(e))
    })
    window.addEventListener('mousemove', e => {
      if (!isMousedown) return
      pointList.push(transformPos(e))
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const points = getStroke(pointList, {
        size: 5
      })
      const pathData = getSvgPathFromStroke(points)
      const path = new Path2D(pathData)
      ctx.fill(path)
    })
    window.addEventListener('mouseup', () => {
      isMousedown = false
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
  perfect()
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
