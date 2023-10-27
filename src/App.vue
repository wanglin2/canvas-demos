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
        <el-menu-item index="path">
          <span>路径</span>
        </el-menu-item>
        <el-menu-item index="signature">
          <span>电子签名</span>
        </el-menu-item>
        <el-menu-item index="roundedRect">
          <span>圆角矩形</span>
        </el-menu-item>
        <el-menu-item index="image">
          <span>图像</span>
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
