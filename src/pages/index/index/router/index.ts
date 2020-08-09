import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      keepalive: true,
    },
    component: () => import("../views/index.vue")
  },
  {
    path: '/TsPractice',
    name: 'TsPractice',
    component: () => import("../views/TsPractice.vue")
  },
    {
    path: '/IviewTable',
    name: 'IviewTable',
    component: () => import("../views/IviewTable.vue")
  },
  {
    path: '/VueTsxTemplate',
    name: 'VueTsxTemplate',
    component: () => import("../views/VueTsxTemplate")
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      keepalive: true,
    },
    component: () => import("../views/Login.vue")
  },
    {
      path: '/NavComponent',
      name: 'NavComponent',
      component: () => import("../views/NavComponent.vue")
    },
    {
      path: '/UploadAndDownload',
      name: 'UploadAndDownload',
      component: () => import("../views/UploadAndDownload.vue")
    },
    {
      path: '/Signature',
      name: 'Signature',
      component: () => import("../views/Signature")
    },
    {
      path: '/VuexTest',
      name: 'VuexTest',
      component: () => import("../views/VuexTest.vue")
    },
    {
      path: '/Antv',
      name: 'Antv',
      component: () => import("../views/Antv")
    },
    {
      path: '/WorkerTest',
      name: 'WorkerTest',
      component: () => import("../views/WorkerTest.vue")
    },
    {
      path: '/KeepAliveTem',
      name: 'KeepAliveTem',
      component: () => import("../views/KeepAliveTem.vue")
    },

]

const router = new VueRouter({
  routes
})

export default router
