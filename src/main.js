// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//引入reset.css
import './assets/css/reset.css'

//引入公共组件，比如搜索框、返回按钮...
import commonComponents from './components/index'
for (let i in commonComponents) {
  Vue.component(i, commonComponents[i])
}

//引入过滤器,比如计算时间
import filters from './filters/index'
for (let i in filters) {
  Vue.filter(i, filters[i])
}

//引入vuex，安装指令：npm i vuex --save
import store from './store/index'

//引入element-ui,安装指令：npm i element-ui --save
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUi)

//图片前缀
Vue.prototype.$imgPre = "http://localhost:3000"
// Vue.prototype.$imgPre = ""


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
