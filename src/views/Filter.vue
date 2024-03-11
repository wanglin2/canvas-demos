<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
    <input type="file" accept="image/*" @change="onFileChange" />
    <button @click="useFilter(1)">黑白</button>
    <button @click="useFilter(2)">灰度</button>
    <button @click="useFilter(3)">模糊</button>
    <input type="text" placeholder="模糊半径" v-model="_radius" />
    <button @click="useFilter(4)">马赛克</button>
    <button type="primary" @click="down">下载图片</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const canvasWidth = 500/2
const canvasHeight = 500/2
const ratio = Math.max(window.devicePixelRatio, 2)
let canvas = null
let ctx = null

const getImageData = (sx, sy, sw, sh) => {
  return ctx.getImageData(sx * ratio, sy * ratio, sw * ratio, sh * ratio)
}
const putImageData = (imageData, dx, dy, ox = 0, oy = 0, ow, oh) => {
  ow = ow === undefined ? imageData.width : ow * ratio
  oh = oh === undefined ? imageData.height : oh * ratio
  ctx.putImageData(
    imageData,
    dx * ratio,
    dy * ratio,
    ox * ratio,
    oy * ratio,
    ow,
    oh
  )
}

const down = () => {
  const imgData = canvas.toDataURL('image/jpeg')
  downloadFile(imgData, '图片.jpeg')
}

const downloadFile = (file, fileName) => {
  const a = document.createElement('a')
  a.href = file
  a.download = fileName
  a.click()
}

const filter = () => {
  const useFilter = type => {
    drawImage()
    const imageData = getImageData(0, 0, canvasWidth, canvasHeight)
    switch (type) {
      case 1:
        blackWhite(imageData)
        break
      case 2:
        grey(imageData)
        break
      case 3:
        blur(imageData)
        break
      case 4:
        mosaic(imageData)
        break
      default:
        break
    }
    putImageData(imageData, 0, 0)
  }

  // 黑白
  const blackWhite = imageData => {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i]
      const g = imageData.data[i + 1]
      const b = imageData.data[i + 2]
      const ava = (r + g + b) / 3
      if (ava > 127) {
        imageData.data[i] = 255
        imageData.data[i + 1] = 255
        imageData.data[i + 2] = 255
      } else {
        imageData.data[i] = 0
        imageData.data[i + 1] = 0
        imageData.data[i + 2] = 0
      }
    }
  }

  // 灰度
  const grey = imageData => {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i]
      const g = imageData.data[i + 1]
      const b = imageData.data[i + 2]
      const ava = (r + g + b) / 3
      imageData.data[i] = ava
      imageData.data[i + 1] = ava
      imageData.data[i + 2] = ava
    }
  }

  // 高斯模糊
  const _radius = ref(10)
  const blur = imageData => {
    const σ = 10
    const radius = Number(_radius.value)
    // 计算权重矩阵
    const weightList = []
    let weightSum = 0 // 权重总和
    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        // 根据二维正态分布函数计算
        const res =
          (1 / (2 * Math.PI * σ * σ)) * Math.exp(-(i * i + j * j) / (2 * σ * σ))
        weightList.push(res)
        weightSum += res
      }
    }
    for (let i = 0; i < weightList.length; i++) {
      weightList[i] /= weightSum
    }
    // 遍历每个像素点
    const width = imageData.width
    const height = imageData.height
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let r = 0
        let g = 0
        let b = 0
        // 遍历周边像素
        let weightIndex = 0
        for (let i = -radius; i <= radius; i++) {
          let nx = x + i
          if (nx < 0 || nx >= width) {
            nx = x + -i
          }
          for (let j = -radius; j <= radius; j++) {
            let ny = j + y
            if (ny < 0 || ny >= height) {
              ny = y + -j
            }
            // 对应的权重
            const weight = weightList[weightIndex++]
            // 当前周围的像素点
            const nindex = ny * width * 4 + nx * 4
            // 像素点的每个通道都和权重相乘，并且累加
            r += imageData.data[nindex] * weight
            g += imageData.data[nindex + 1] * weight
            b += imageData.data[nindex + 2] * weight
          }
        }
        // 修改当前中心点像素
        const index = y * width * 4 + x * 4
        imageData.data[index] = r
        imageData.data[index + 1] = g
        imageData.data[index + 2] = b
      }
    }
  }

  // 马赛克
  const mosaic = imageData => {
    // 遍历每个像素点
    const width = imageData.width
    const height = imageData.height
    const size = 10 // 马赛克块的大小
    for (let x = 0; x < width; x += size) {
      for (let y = 0; y < height; y += size) {
        let r = 0
        let g = 0
        let b = 0
        let count = 0
        // 遍历当前马赛克块内的像素
        for (let i = 0; i < size; i++) {
          const nx = x + i
          for (let j = 0; j < size; j++) {
            const ny = y + j
            // 当前像素点
            const nindex = ny * width * 4 + nx * 4
            // 计算总和
            r += imageData.data[nindex]
            g += imageData.data[nindex + 1]
            b += imageData.data[nindex + 2]
            // 计算数量
            count++
          }
        }
        // 计算平均值
        const ra = r / count
        const ga = g / count
        const ba = b / count
        // 更新当前马赛克块的像素
        for (let i = 0; i < size; i++) {
          const nx = x + i
          for (let j = 0; j < size; j++) {
            const ny = y + j
            const nindex = ny * width * 4 + nx * 4
            imageData.data[nindex] = ra
            imageData.data[nindex + 1] = ga
            imageData.data[nindex + 2] = ba
          }
        }
      }
    }
  }

  // 选择图片
  const onFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        console.log(reader.result)
        initImg(reader.result)
      })
      reader.readAsDataURL(file)
    }
  }

  // 绘制图片
  let img = null
  const drawImage = () => {
    ctx.drawImage(img, 0, 0, canvasWidth, canvasWidth)
  }

  const initImg = url => {
    img = new Image()
    img.onload = () => {
      drawImage()
    }
    img.src =
      url ||
      (import.meta.env.PROD ? 'https://wanglin2.github.io/canvas-demos' : '') +
        '/oven.jpeg'
  }

  return { useFilter, initImg, onFileChange, _radius }
}
const { useFilter, initImg, onFileChange, _radius } = filter()

onMounted(() => {
  canvas = document.getElementById('canvas')
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  initImg()
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
