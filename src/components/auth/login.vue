<template>
  <quasar-layout>
      <div slot="header" class="toolbar">
        <quasar-toolbar-title :padding="1">
          <button v-go-back="'/'">
            <i>arrow_back</i>
          </button>
          Login
        </quasar-toolbar-title>
      </div>
      <div class="layout-view layout-padding">
        <div class="list">
          <div class="item three-lines">
            <i class="item-primary">mail</i>
            <div class="item-content">
              <div class="stacked-label">
                <input v-model="credentials.email" required placeholder="Digite seu email" class="full-width">
                <label>Email</label>
              </div>
            </div>
          </div>
          <hr>
          <div class="item three-lines">
            <i class="item-primary">vpn_key</i>
            <div class="item-content">
              <div class="stacked-label">
                <input v-model="credentials.password" type="password" required placeholder="Digite a senha" class="full-width">
                <label>Password</label>
              </div>
            </div>
          </div>
        </div>
        <button class="primary full-width" @click="submit()">Login</button>
      </div>
    </quasar-layout>
</template>

<script>
import auth from '../../auth'

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      auth.login(this, this.credentials, 'home')
    }
  }
}
</script>
