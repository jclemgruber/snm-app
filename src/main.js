import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMask from 'v-mask'
import Quasar from 'quasar'
import router from './router'
import Auth from './auth'
import App from './App'
import moment from 'moment'

Quasar.theme.set(__THEME)
Vue.use(VueResource)
Vue.use(VueMask)
Vue.use(Quasar) // Install Quasar Framework

Auth.checkAuth()

moment.locale('pt-br')

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#quasar-app',
    router,
    render: h => h(App)
  })
})
