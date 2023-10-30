<template>
  <div class="canvasBox">
    <div class="canvasWrap">
      <canvas id="canvas"></canvas>
    </div>
    <el-button type="primary" @click="down">下载图片</el-button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

let canvas = null

onMounted(() => {
  canvas = document.getElementById('canvas')
  const init = (width, height) => {
    const ratio = window.devicePixelRatio
    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(ratio, ratio)
    return ctx
  }

  const useQuality = () => {
    const img = new Image()
    img.onload = () => {
      const ctx = init(img.width, img.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = '/big.jpg'
  }
  // useQuality()

  const useScale = ({ targetWidth, targetHeight }) => {
    const img = new Image()
    img.onload = () => {
      // 原图比例
      const imgRatio = img.width / img.height
      // 提供了目标宽度
      if (targetWidth !== undefined) {
        // 如果原图宽度小于目标宽度，那么不处理
        if (img.width > targetWidth) {
          targetHeight = targetWidth / imgRatio
        }
      } else if (targetHeight !== undefined) {
        // 提供了目标高度
        if (img.height > targetHeight) {
          targetWidth = targetHeight * imgRatio
        }
      }
      const ctx = init(targetWidth, targetHeight)
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
    }
    img.src = '/big.jpg'
  }
  useScale({
    targetWidth: 2000
  })
})

const down = () => {
  // useQuality
  // const imgData = canvas.toDataURL('image/jpeg', 0.2)
  // downloadFile(imgData, '图片.jpg')

  // useScale
  const imgData = canvas.toDataURL('image/jpeg')
  downloadFile(imgData, '图片.jpeg')
}

const downloadFile = (file, fileName) => {
  const a = document.createElement('a')
  a.href = file
  a.download = fileName
  a.click()
}
</script>

<style lang="less" scoped>
.canvasBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .canvasWrap {
    width: 500px;
    height: 500px;
    overflow: auto;
  }

  canvas {
    border: 1px solid;
  }
}
</style>
