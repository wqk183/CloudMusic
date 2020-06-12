import Vue from 'vue'
import App from './App'
import store from './store/index.js'
// import axios from 'axios'
import uniNavBar from './components/uni-nav-bar/uni-nav-bar.vue'
Vue.config.productionTip = false

// Vue.prototype.$axios=axios
//Vue.prototype.$store=store
//Vue.prototype.$baseURL="http://localhost:30000"  //本地
Vue.prototype.$baseURL="http://101.37.202.137:30000"  //线上
App.mpType = 'app'
Vue.component('uniNavBar',uniNavBar)
const app = new Vue({
	store,
    ...App
})
app.$mount()
