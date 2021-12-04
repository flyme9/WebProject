import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Scroller from '@/components/Scroller'
import axios from 'axios'

// 将axios绑定在vue原型上
Vue.prototype.axios=axios
Vue.filter('imgFilter',(url,arg)=>{
  // 将图片路径中的w.h替换成指定的数据
  return url.replace(/w\.h/,arg)
})

Vue.component('Scroller',Scroller)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
