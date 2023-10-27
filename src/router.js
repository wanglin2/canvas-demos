import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/basicUse' },
  { path: '/basicUse', component: () => import('./views/BasicUse.vue') },
  { path: '/path', component: () => import('./views/Path.vue') },
  { path: '/signature', component: () => import('./views/Signature.vue') },
  { path: '/roundedRect', component: () => import('./views/RoundedRect.vue') },
  { path: '/image', component: () => import('./views/Image.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
