import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入 vant-ui.js 自动注册所有需要的组件
import '@/utils/vant-ui'
import ArticleItem from '@/components/ArticleItem.vue'

// 全局注册
Vue.component('ArticleItem', ArticleItem)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
