<template>
  <div class="canvasBox" id="canvasBox">
    <input type="file" accept="image/*" id="fileSelect" />
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvasBox = document.getElementById('canvasBox')
  const canvasBoxRect = canvasBox.getBoundingClientRect()
  const canvas = document.getElementById('canvas')
  const canvasWidth = canvasBoxRect.width
  const canvasHeight = canvasBoxRect.height
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const fileSelect = document.getElementById('fileSelect')
  fileSelect.addEventListener('change', e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      canvas.style.display = 'block'
      const img = new Image()
      img.onload = () => {
        const imgRatio = img.width / img.height
        const canvasRatio = canvasWidth / canvasHeight
        let imgShowWidth = 0
        let imgShowHeight = 0
        if (img.width <= canvasWidth && img.height <= canvasHeight) {
          // 如果图片长和宽都比画布小，那么不需要缩放
          imgShowWidth = img.width
          imgShowHeight = img.height
        } else if (imgRatio > canvasRatio) {
          // 宽度缩小为画布的宽度
          imgShowWidth = canvasWidth
          imgShowHeight = imgShowWidth / imgRatio
        } else {
          // 高度缩小为画布的高度
          imgShowHeight = canvasHeight
          imgShowWidth = imgShowHeight * imgRatio
        }
        reDrawImage.data = {
          img,
          width: imgShowWidth,
          height: imgShowHeight
        }
        reDrawImage()
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })

  const reDrawImage = () => {
    ctx.save()
    state.x += dx
    state.y += dy
    const t = ctx.getTransform()
    ctx.translate(state.x - t.e, state.y - t.f)
    const { img, width, height } = reDrawImage.data
    ctx.drawImage(img, 0, 0, width, height)
    ctx.restore()
  }

  const state = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1
  }

  let isMousedown = false
  let mousedownPos = {
    x: 0,
    y: 0
  }
  canvas.addEventListener('mousedown', e => {
    isMousedown = true
    mousedownPos.x = e.clientX
    mousedownPos.y = e.clientY
  })
  const rect = canvas.getBoundingClientRect()
  window.addEventListener('mousemove', e => {
    if (!isMousedown) return
    const dx = e.clientX - mousedownPos.x
    const dy = e.clientY - mousedownPos.y
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    reDrawImage(dx, dy)
  })
  window.addEventListener('mouseup', () => {
    isMousedown = false
  })

  //   canvas.addEventListener('wheel', e => {
  //     if (e.deltaY < 0) {
  //       // 放大
  //       ctx.scale(1.1, 1.1)
  //       reDrawImage()
  //     } else {
  //       // 缩小
  //       ctx.scale(0.9, 0.9)
  //       reDrawImage()
  //     }
  //   })
})
</script>

<style lang="less" scoped>
.canvasBox {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    position: absolute;
    display: none;
  }
}
</style>
