<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>

    <div class="wrap">
      <input type="text" id="output" />
      <div class="boxWrap">
        <div id="box"></div>
      </div>
      <button id="start">开始</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvasWidth = 300
  const canvasHeight = 600
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const box = document.getElementById('box')
  const start = document.getElementById('start')
  const output = document.getElementById('output')
  start.addEventListener('click', () => {
    if (box.classList.contains('move')) {
      box.classList.remove('move')
    } else {
      box.classList.add('move')
    }
  })

  const setCubicBezier = (x1, y1, x2, y2) => {
    const value = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
    output.value = value
    box.style.transitionTimingFunction = value
  }

  const rect = canvas.getBoundingClientRect()
  const windowToCanvas = e => {
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    return {
      x,
      y
    }
  }

  const isPointInPath = (x, y, path) => {
    x = x * ratio
    y = y * ratio
    return path ? ctx.isPointInPath(path, x, y) : ctx.isPointInPath(x, y)
  }

  const padding = 20
  const contentWidth = canvasWidth - padding * 2
  const contentHeight = canvasHeight - padding * 2

  const drawCircle = (x, y, color = '#fff') => {
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  const drawCirclePath = (x, y) => {
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2)
  }

  const drawLine = (x1, y1, x2, y2, color = '#000') => {
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.restore()
  }

  const drawInNewCoordSystem = fn => {
    ctx.save()

    // 修改坐标系
    ctx.translate(
      padding,
      padding + (contentHeight - contentWidth) / 2 + contentWidth
    )
    ctx.scale(1, -1)

    fn()

    ctx.restore()
  }

  const p1 = {
    x: 0,
    y: contentWidth
  }
  const p2 = {
    x: contentWidth,
    y: 0
  }

  const draw = () => {
    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    drawInNewCoordSystem(() => {
      // 绘制坐标轴
      ctx.beginPath()
      ctx.moveTo(0, contentWidth)
      ctx.lineTo(0, 0)
      ctx.lineTo(contentWidth, 0)
      ctx.stroke()

      // 绘制控制点到起止点的连线
      drawLine(p1.x, p1.y, 0, 0, '#ff0088')
      drawLine(p2.x, p2.y, contentWidth, contentWidth, '#00aabb')

      // 绘制贝塞尔曲线
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, contentWidth, contentWidth)
      ctx.stroke()

      // 绘制起点和终点
      drawCircle(0, 0)
      drawCircle(contentWidth, contentWidth)

      // 绘制控制点
      drawCircle(p1.x, p1.y, '#ff0088')
      drawCircle(p2.x, p2.y, '#00aabb')
    })
  }
  draw()

  // 当前按住的控制点
  let mousedownPoint = ''
  // 鼠标按下的坐标
  const mousedownPos = {
    x: 0,
    y: 0
  }
  // 当前按住的控制点此刻的坐标
  const mousedownPointPos = {
    x: 0,
    y: 0
  }
  canvas.addEventListener('mousedown', e => {
    const pos = windowToCanvas(e)
    mousedownPos.x = pos.x
    mousedownPos.y = pos.y

    drawInNewCoordSystem(() => {
      // 控制控制点1的路径
      drawCirclePath(p1.x, p1.y)
      let isInPoint1 = isPointInPath(pos.x, pos.y)
      let isInPoint2 = false
      if (!isInPoint1) {
        // 控制控制点2的路径
        drawCirclePath(p2.x, p2.y)
        isInPoint2 = isPointInPath(pos.x, pos.y)
      }
      if (isInPoint1) {
        mousedownPointPos.x = p1.x
        mousedownPointPos.y = p1.y
        mousedownPoint = 'point1'
      } else if (isInPoint2) {
        mousedownPointPos.x = p2.x
        mousedownPointPos.y = p2.y
        mousedownPoint = 'point2'
      }
    })
  })
  window.addEventListener('mousemove', e => {
    if (!mousedownPoint) return
    const pos = windowToCanvas(e)
    const dx = pos.x - mousedownPos.x
    const dy = pos.y - mousedownPos.y
    let newX = mousedownPointPos.x + dx
    const newY = mousedownPointPos.y - dy
    newX = newX < 0 ? 0 : newX > contentWidth ? contentWidth : newX
    if (mousedownPoint === 'point1') {
      p1.x = newX
      p1.y = newY
    } else if (mousedownPoint === 'point2') {
      p2.x = newX
      p2.y = newY
    }
    draw()
  })
  window.addEventListener('mouseup', () => {
    if (!mousedownPoint) return
    mousedownPoint = ''
    const x1 = (p1.x / contentWidth).toFixed(2)
    const y1 = (p1.y / contentWidth).toFixed(2)
    const x2 = (p2.x / contentWidth).toFixed(2)
    const y2 = (p2.y / contentWidth).toFixed(2)
    setCubicBezier(x1, y1, x2, y2)
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
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .wrap {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    input {
      margin-bottom: 20px;
    }

    .boxWrap {
      width: 400px;
      height: 100px;
      margin-bottom: 20px;
      position: relative;

      #box {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: lightcoral;
        left: 0;
        top: 0;
        transition-property: left;
        transition-duration: 1s;

        &.move {
          left: 300px;
        }
      }
    }

    button {
      width: 100px;
      cursor: pointer;
    }
  }
}
</style>
