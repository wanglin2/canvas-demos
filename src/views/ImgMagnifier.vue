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
  const width = 200
  const height = 200
  const ratio = window.devicePixelRatio
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'

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
      canvas.width,
      canvas.height
    )
  })
  imgBox.addEventListener('mouseleave', () => {
    isInImgBox = false
    area.style.display = 'none'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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
