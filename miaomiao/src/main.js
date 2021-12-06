import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import Scroller from '@/components/Scroller'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
import moment from 'moment'

Vue.filter('imgFilter',(url,arg)=>{
  // 将图片路径中的w.h替换成指定的数据
  return url.replace(/w\.h/,arg)
})
Vue.filter('actorsFilter', (data) => {
  if (data === undefined) return '暂无主演'
  return data.map(item => item.name).join(' ')
})
Vue.filter('timerFilter', (data) => {
  moment.locale('zh-cn')
  return moment(data*1000).format('LL')
})
Vue.component('Scroller',Scroller)  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
