import Vue from 'vue'
import router from './router'
import store from './store'
import axios from './axios'
import App from './App.vue'

import '@/mock'
import '@/assets/css'
import '@/assets/icons'

Vue.use(axios)
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')