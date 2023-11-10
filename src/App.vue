<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const defaultActive = ref('')
defaultActive.value = route.path.slice(1)

watch(
  () => {
    return route.path
  },
  () => {
    defaultActive.value = route.path.slice(1)
  }
)

const onSelect = index => {
  router.push('/' + index)
}
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <el-menu :default-active="defaultActive" class="menu" @select="onSelect">
        <el-menu-item index="basicUse">
          <span>基本使用</span>
        </el-menu-item>
        <el-menu-item index="eraser">
          <span>橡皮擦</span>
        </el-menu-item>
        <el-menu-item index="path">
          <span>路径</span>
        </el-menu-item>
        <el-menu-item index="roundedRect">
          <span>圆角矩形</span>
        </el-menu-item>
        <el-menu-item index="signature">
          <span>电子签名</span>
        </el-menu-item>
        <el-menu-item index="arrow">
          <span>箭头</span>
        </el-menu-item>
        <el-menu-item index="domToImg">
          <span>DOM节点转图片</span>
        </el-menu-item>
        <el-menu-item index="compressImg">
          <span>压缩图片</span>
        </el-menu-item>
        <el-menu-item index="imgMagnifier">
          <span>商品图片放大镜</span>
        </el-menu-item>
        <el-menu-item index="text">
          <span>文本</span>
        </el-menu-item>
        <el-menu-item index="layoutEngine">
          <span>排版引擎</span>
        </el-menu-item>
        <el-menu-item index="transform">
          <span>变换</span>
        </el-menu-item>
        <el-menu-item index="regularPolygon">
          <span>正多边形</span>
        </el-menu-item>
        <el-menu-item index="event">
          <span>事件</span>
        </el-menu-item>
        <el-menu-item index="bezierEditor">
          <span>贝塞尔曲线编辑器</span>
        </el-menu-item>
        <el-menu-item index="animation">
          <span>动画</span>
        </el-menu-item>
        <el-menu-item index="liquid">
          <span>水波图</span>
        </el-menu-item>
        <el-menu-item index="searchlight">
          <span>探照灯</span>
        </el-menu-item>
        <el-menu-item index="firework">
          <span>烟花</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  .sidebar {
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    overflow-y: auto;

    .menu {
      height: 100%;
    }
  }

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
