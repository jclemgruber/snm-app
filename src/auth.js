import Vue from 'vue'
import Router from './router'
import { Toast, SessionStorage } from 'quasar'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post('/api/token', creds).then((response) => {
      SessionStorage.set('id_token', response.data.token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + SessionStorage.get.item('id_token')
      this.getAuthUser(context)

      if (redirect) {
        Router.push(redirect)
      }
    }, (response) => {
      Toast.create.negative(response.json().error)
    })
  },

  signup (context, creds, redirect) {
    context.$http.post('/api/register', creds).then((response) => {
      SessionStorage.set('id_token', response.data.token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + SessionStorage.get.item('id_token')
      this.getAuthUser(context)

      if (redirect) {
        Router.push(redirect)
      }
    }, (response) => {
      Toast.create.negative(response.json().error)
    })
  },

  logout () {
    SessionStorage.clear()
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = SessionStorage.get.item('id_token')

    if (jwt) {
      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + jwt
    }
    else {
      this.user.authenticated = false
    }
  },

  getAuthUser (context) {
    context.$http.get('/api/user').then((response) => {
      SessionStorage.set('user', response.json())
    }, (response) => {
      Toast.create.negative('Something went wrong!')
    })
  }
}
