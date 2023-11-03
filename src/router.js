import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/basicUse' },
  { path: '/eraser', component: () => import('./views/Eraser.vue') },
  { path: '/path', component: () => import('./views/Path.vue') },
  { path: '/signature', component: () => import('./views/Signature.vue') },
  { path: '/roundedRect', component: () => import('./views/RoundedRect.vue') },
  { path: '/arrow', component: () => import('./views/Arrow.vue') },
  { path: '/domToImg', component: () => import('./views/DomToImg.vue') },
  { path: '/compressImg', component: () => import('./views/CompressImg.vue') },
  { path: '/imgMagnifier', component: () => import('./views/ImgMagnifier.vue') },
  { path: '/text', component: () => import('./views/Text.vue') },
  { path: '/layoutEngine', component: () => import('./views/LayoutEngine.vue') },
  { path: '/transform', component: () => import('./views/Transform.vue') },
  { path: '/regularPolygon', component: () => import('./views/RegularPolygon.vue') },
  { path: '/imgViewer', component: () => import('./views/ImgViewer.vue') },
  { path: '/event', component: () => import('./views/Event.vue') },
  { path: '/bezierEditor', component: () => import('./views/BezierEditor.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
