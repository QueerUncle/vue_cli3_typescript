import Vue from 'vue'
import Vuex from 'vuex'
import customStore from "@/pages/index/index/store/customStore";

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo:{},
    iframeurl:'',
  },
  mutations: {
  },
  actions: {},
  modules: {
    customStore,
  }
})
