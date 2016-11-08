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
    { path: '/logout', component: load('auth/logout') },
    { path: '/register', component: load('auth/register') },
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
    {
      path: '/museus',
      component: load('layout/main'),
      children: [
        { path: '/', component: load('museus/index') },
        { path: 'create', component: load('museus/create') }
      ]
    },
    {
      path: '/temas',
      component: load('layout/main'),
      children: [
        { path: '/', component: load('admin/temas/index') },
        { path: 'create', component: load('admin/temas/create') },
        { path: ':id', component: load('admin/temas/update') }

      ]
    },
    { path: '*', component: load('error404') } // Not found
  ]
})
