import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
