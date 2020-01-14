import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uniNavBar from './components/uni-nav-bar/uni-nav-bar.vue'
Vue.config.productionTip = false
Vue.prototype.$store=store
App.mpType = 'app'
Vue.component('uniNavBar',uniNavBar)
const app = new Vue({
    ...App
})
app.$mount()
