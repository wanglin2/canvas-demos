import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/basicUse' },
  { path: '/basicUse', component: () => import('./views/BasicUse.vue') },
  { path: '/path', component: () => import('./views/Path.vue') },
  { path: '/signature', component: () => import('./views/Signature.vue') },
  { path: '/roundedRect', component: () => import('./views/RoundedRect.vue') },
  { path: '/arrow', component: () => import('./views/Arrow.vue') },
  { path: '/domToImg', component: () => import('./views/DomToImg.vue') },
  { path: '/compressImg', component: () => import('./views/CompressImg.vue') },
  { path: '/imgMagnifier', component: () => import('./views/ImgMagnifier.vue') },
  { path: '/text', component: () => import('./views/Text.vue') },
  { path: '/layoutEngine', component: () => import('./views/LayoutEngine.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
