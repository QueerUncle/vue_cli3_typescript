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
    {
      path: '/ScrollIvewTable',
      name: 'ScrollIvewTable',
      component: () => import("../views/ScrollIvewTable.vue")
    },
    {
      path: '/ES6',
      name: 'ES6',
      component: () => import("../views/ES6.vue")
    },
    {
      path: '/TreeVue',
      name: 'TreeVue',
      component: () => import("../views/TreeVue.vue")
    },
    {
      path: '/CustomTreeVue',
      name: 'CustomTreeVue',
      component: () => import("../views/CustomTreeVue.vue")
    },
    {
      path: '/BpmJs',
      name: 'BpmJs',
      component: () => import("../views/BpmJs.vue")
    },
    {
      path: '/BpmVue',
      name: 'BpmVue',
      component: () => import("../views/BpmVue.vue")
    },
    {
      path: '/FlowTree',
      name: 'FlowTree',
      component: () => import("../views/FlowTree")
    },
    {
      path: '/SceneFrontTest',
      name: 'SceneFrontTest',
      component: () => import("../views/SceneFrontTest.vue")
    },
    {
      path: '/Fireworks',
      name: 'Fireworks',
      component: () => import("../views/Fireworks/Fireworks.vue")
    },
    {
      path: '/Cssanimation',
      name: 'Cssanimation',
      component: () => import("../views/Cssanimation.vue")
    },
    {
      path: '/CustomMonaco',
      name: 'CustomMonaco',
      component: () => import("../views/CustomMonaco.vue")
    },

]

const router = new VueRouter({
  routes
})

export default router
