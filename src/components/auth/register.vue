<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        <button v-go-back="'/'">
          <i>arrow_back</i>
        </button>
        Registrar
      </q-toolbar-title>
    </div>
    <div class="layout-view layout-padding">
      <div class="list">
        <div class="item three-lines">
          <i class="item-primary">face</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.name" required placeholder="Seu nome" class="full-width">
              <label>Nome</label>
            </div>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <i class="item-primary">mail</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.email" required placeholder="Seu email" class="full-width">
              <label>Email</label>
            </div>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <i class="item-primary">person</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.cpf" v-mask="'###.###.###-##'" required placeholder="Seu cpf" class="full-width">
              <label>CPF</label>
            </div>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <i class="item-primary">vpn_key</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.password" type="password" required placeholder="Sua senha" class="full-width">
              <label>Senha</label>
            </div>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <i class="item-primary">vpn_key</i>
          <div class="item-content">
            <div class="stacked-label">
              <input v-model="credentials.password_confirmation" type="password" required placeholder="Repita sua senha" class="full-width">
              <label>Confirmação da senha</label>
            </div>
          </div>
        </div>
      </div>
      <button class="primary full-width" @click="submit()">Registrar</button>
    </div>
  </q-layout>
</template>

<script>
import auth from '../../auth'

export default {
  data () {
    return {
      credentials: {
        name: '',
        email: '',
        cpf: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  methods: {
    submit () {
      auth.signup(this, this.credentials, 'login')
    }
  }
}
</script>
