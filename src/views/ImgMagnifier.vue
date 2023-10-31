<template>
  <div class="canvasBox">
    <div id="imgBox">
      <img id="img" src="/oven.jpeg" alt="" />
      <div id="area"></div>
    </div>
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

  // 图片容器元素
  const imgBox = document.getElementById('imgBox')
  const imgBoxRect = imgBox.getBoundingClientRect() // 尺寸和位置信息
  const imgBoxSize = imgBoxRect.width // 尺寸
  // 图片元素
  const img = document.getElementById('img')
  // 指示器元素
  const area = document.getElementById('area')
  const areaSize = 50 // 指示器元素的大小
  let isInImgBox = false
  imgBox.addEventListener('mouseover', () => {
    isInImgBox = true
    area.style.display = 'block'
  })
  imgBox.addEventListener('mousemove', e => {
    if (!isInImgBox) return
    let left = e.clientX - areaSize / 2 - imgBoxRect.left
    let top = e.clientY - areaSize / 2 - imgBoxRect.top
    left = Math.max(left, 0)
    left = Math.min(left, imgBoxSize - areaSize)
    top = Math.max(top, 0)
    top = Math.min(top, imgBoxSize - areaSize)
    area.style.left = left + 'px'
    area.style.top = top + 'px'

    const originWidth = img.naturalWidth
    const widthRatio = originWidth / imgBoxSize
    const originHeight = img.naturalHeight
    const heightRatio = originHeight / imgBoxSize
    const sx = left * widthRatio
    const sy = top * heightRatio
    const sWidth = areaSize * widthRatio
    const sHeight = areaSize * heightRatio
    ctx.drawImage(
      img,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    )
  })
  imgBox.addEventListener('mouseleave', () => {
    isInImgBox = false
    area.style.display = 'none'
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
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

  #imgBox {
    width: 200px;
    height: 200px;
    margin-right: 20px;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }

    #area {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  canvas {
    border: 1px solid;
  }
}
</style>
