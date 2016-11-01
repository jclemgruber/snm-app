import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*
  Avoid lazy loading while in dev mode
  to benefit from HMR
 */
function load (name) {
  if (process.env.NODE_ENV === 'development') {
    return require('components/' + name + '.vue')
  }
  else {
    return (resolve) => {
      require('bundle?lazy!components/' + name + '.vue')(resolve)
    }
  }
}

export default new VueRouter({
  routes: [
    { path: '/', component: load('index') }, // Default
    { path: '/login', component: load('auth/login') },
    {
      path: '/home',
      component: load('layout/main'),
      children: [
        {
          path: '/',
          component: load('home')
        }
      ]
    },
    { path: '*', component: load('error404') } // Not found
  ]
})
