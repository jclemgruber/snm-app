<template>
  <div class="list">

    <div class="item three-lines">
      <i class="item-primary" @click.prevent="searchCEP">search</i>
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.cep" v-mask="'##.###-###'" required class="full-width">
          <label>CEP</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <q-autocomplete v-model="terms" :min-characters="3" @search="searchCidade">
            <input v-model="terms" class="full-width" placeholder="digite o nome da cidade" />
          </q-autocomplete>
          <label>Cidade</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.logradouro" required class="full-width">
          <label>Logradouro</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.numero" required class="full-width">
          <label>Numero</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.complemento" required class="full-width">
          <label>Complemento</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.bairro" required class="full-width">
          <label>Bairro</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import {SessionStorage, Toast} from 'quasar'

export default {
  name: 'MuseuEndereco',

  props: {
    MuseuEndereco: {
      type: Object
    }
  },

  data () {
    return {
      terms: '',
      limit: 5
    }
  },

  computed: {
    getParams () {
      return {
        'params': {
          q: this.terms,
          limit: this.limit
        }
      }
    }
  },

  methods: {
    searchCidade (terms, done) {
      this.$http.get('/api/cidades/list', this.getParams).then((response) => {
        done(response.data)
      }, (response) => {
        console.log(response)
        done([])
      })
    },

    searchCEP () {
      if (!this.MuseuEndereco.cep) {
        return
      }

      var formattedCEP = this.MuseuEndereco.cep.split('.').join('').split('-').join('')

      if (formattedCEP.length < 8) {
        return
      }

      delete Vue.http.headers.common['Authorization']

      var url = 'https://viacep.com.br/ws/' + formattedCEP + '/json'
      this.$http.get(url).then((response) => {
        this.MuseuEndereco.logradouro = response.data.logradouro
        this.MuseuEndereco.complemento = response.data.complemento
        this.MuseuEndereco.bairro = response.data.bairro
        // this.MuseuEndereco.cidade_id = response.data.localidade
      }, (response) => {
        Toast.create.negative('CEP não encontrado!')
        this.MuseuEndereco.logradouro = ''
        this.MuseuEndereco.complemento = ''
        this.MuseuEndereco.bairro = ''
        // this.MuseuEndereco.cidade_id = ''
      })

      Vue.http.headers.common['Authorization'] = 'Bearer ' + SessionStorage.get.item('id_token')
    }
  }
}
</script>
