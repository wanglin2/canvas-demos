<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  canvas.width = 500
  canvas.height = 500
  canvas.style.width = '250px'
  canvas.style.height = '250px'
  const ctx = canvas.getContext('2d')
  ctx.fillRect(0, 0, 250, 250)
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
