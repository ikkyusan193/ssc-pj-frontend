import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import store from './store/index'

Vue.config.productionTip = false


axios.defaults.baseURL = "/api/"

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
