import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import http from './utils/http'
Vue.use(http)
//全局vue挂载axios数据
// import axios from 'axios'
// Vue.proptotype.$http=axios;

Vue.use(ElementUi)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
