<template>
  <div class="canvasBox">
    <div
      id="el"
      style="
        border: 1px solid lightcoral;
        padding: 10px;
        width: 250px;
        height: 250px;
        background-color: #fff;
      "
    >
      <h1>foreignObject</h1>
      <p>
        SVG中的<span style="font-weight: bold; color: lightblue"
          >foreignObject</span
        >元素允许包含来自不同的 XML 命名空间的元素。在浏览器的上下文中，很可能是
        <span style="background-color: lightseagreen; color: #fff"
          >XHTML / HTML</span
        >。
      </p>
    </div>
    <canvas id="canvas" style="margin: 0 10px"></canvas>
    <el-button type="primary" @click="down">下载图片</el-button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

let canvas = null

onMounted(() => {
  canvas = document.getElementById('canvas')
  const canvasWidth = 250
  const canvasHeight = 250
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  const drawImage = () => {
    const url =
      'https://img2.baidu.com/it/u=360656313,1422536269&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      ctx.drawImage(img, 0, 0)

      const imgData = canvas.toDataURL('image/jpeg', 0.1)
      const imgData2 = canvas.toDataURL('image/jpeg', 1)
      document.querySelector('#img1').src = imgData
      document.querySelector('#img2').src = imgData2
    }
    img.src = url
  }
  // drawImage()

  const exportHTMLToImg = async () => {
    const el = document.getElementById('el')
    const rect = el.getBoundingClientRect()
    // 克隆一份
    const clone = el.cloneNode(true)
    // 添加xhtml命名空间
    clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
    // 拼接svg字符串
    const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
                    <style>*{margin:0; padding:0; box-sizing:border-box;}</style>
                    <foreignObject width="${rect.width}" height="${rect.height}">${clone.outerHTML}</foreignObject>
                </svg>`
    // 转换成blob数据
    const blob = new Blob([svgStr], {
      type: 'image/svg+xml'
    })
    // 转换成data:url数据
    const svgUrl = await blobToUrl(blob)
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
    }
    img.onerror = e => {
      console.log(e)
    }
    img.src = svgUrl
  }

  const blobToUrl = blob => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = evt => {
        resolve(evt.target.result)
      }
      reader.onerror = err => {
        reject(err)
      }
      reader.readAsDataURL(blob)
    })
  }
  exportHTMLToImg()
})

const down = () => {
  const imgData = canvas.toDataURL()
  downloadFile(imgData, '图片.png')
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

  canvas {
    border: 1px solid;
  }
}
</style>
