<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvasWidth = 600
  const canvasHeight = 400
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const textBaselineDemo = () => {
    ctx.beginPath()
    ctx.moveTo(0, canvasHeight / 2)
    ctx.lineTo(canvasWidth, canvasHeight / 2)
    ctx.stroke()
    ;[
      'alphabetic',
      'top',
      'hanging',
      'middle',
      'ideographic',
      'bottom'
    ].forEach((item, index) => {
      ctx.textBaseline = item
      ctx.fillText('abg我一二三123', 100 * index, canvasHeight / 2)
    })
  }
  textBaselineDemo()

  const getFont = ({
    fontSize = 16,
    fontFamily = '楷体, 楷体_GB2312, SimKai, STKaiti',
    fontWeight = '',
    fontStyle = ''
  } = {}) => {
    return `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
  }

  ctx.font = getFont({
    fontStyle: 'italic',
    fontWeight: 'bold',
    // fontFamily: 'serif'
  })
  ctx.fillText('Canvas实战', 100, 100)

  ctx.textAlign = 'center'
  ctx.fillText('Canvas实战', 100, 120)

  ctx.textAlign = 'right'
  ctx.fillText('Canvas实战', 100, 140)

  const textMetrics = ctx.measureText('Canvas实战')
  console.log('文本宽度', textMetrics.width, textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight)
  console.log('文本高度', textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent)
  console.log('字体高度', textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent)
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
