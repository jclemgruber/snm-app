import Vue from 'vue'
import VueResource from 'vue-resource'
import Quasar from 'quasar'
import router from './router'
import Auth from './auth'
import App from './App'

Quasar.theme.set(__THEME)
Vue.use(VueResource)
Vue.use(Quasar) // Install Quasar Framework

Auth.checkAuth()

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#quasar-app',
    router,
    render: h => h(App)
  })
})
