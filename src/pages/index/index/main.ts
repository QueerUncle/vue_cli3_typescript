import Vue from 'vue'
import CustomModules from '@/common/CustomModules/index';
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import '../../../../my-theme/dist/iview.css';
Vue.use(ViewUI);
import Http from '@/common/assets/js/Ajax'
Vue.use(Http);
import iviewArea from 'iview-area';
Vue.use(iviewArea);
import '@/common/assets/css/reset.css'
import '@/common/assets/css/iview_public.css';
import '@/common/assets/css/user_public.css';
import '@/common/assets/iconfont/iconfont.css';
// import cbimUi from 'cbimui';
// Vue.use(cbimUi);
Vue.use(CustomModules);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
