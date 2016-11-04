import Vue from 'vue'
import Router from './router'
import { Toast, SessionStorage } from 'quasar'
import helper from './libs/helper'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post('/api/token', creds).then((response) => {
      SessionStorage.set('id_token', response.data.token)

      this.user.authenticated = true
      Vue.http.headers.common['Authorization'] = 'Bearer ' + SessionStorage.get.item('id_token')

      context.$http.get('/api/user').then((response) => {
        SessionStorage.set('user', response.data)
        if (redirect) {
          Router.push(redirect)
        }
      }, (response) => {
        Toast.create.negative('Erro ao buscar informações do usuário!')
      })
    }, (response) => {
      Toast.create.negative(response.data.error)
    })
  },

  signup (context, creds, redirect) {
    context.$http.post('/api/register', creds).then((response) => {
      Toast.create({
        html: 'Usuário ' + response.data.email + ' cadastrado !',
        icon: 'thumb_up'
      })
      if (redirect) {
        Router.push(redirect)
      }
      // SessionStorage.set('id_token', response.data.token)

      // this.user.authenticated = true
      // Vue.http.headers.common['Authorization'] = 'Bearer ' + SessionStorage.get.item('id_token')
    }, (response) => {
      let strResp = helper.formatAsHtmlList(helper.getListError(response.data))
      Toast.create.negative({html: strResp, timeout: 25000})
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
  }
}
