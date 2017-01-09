<template>
<div>
  <div class="layout-padding">
    <h5>Novo Museu</h5>

      <q-tabs :refs="$refs" default-tab="tab-1">
        <q-tab name="tab-1" icon="store_mall_directory">Cadastro</q-tab>
        <q-tab name="tab-2" icon="edit_location">Endereço</q-tab>
      </q-tabs>

       <div ref="tab-1">
          <museu-cadastro :Museu="Museu" :InstituicaoTipos="InstituicaoTipos"></museu-cadastro>
       </div>

       <div ref="tab-2">
          <museu-endereco :MuseuEndereco="MuseuEndereco"></museu-endereco>
       </div>

    <button class="primary full-width" @click="submit">Cadastrar Museu</button>

  </div>
</div>
</template>

<script>
import MuseuCad from './_museucad'
import MuseuEnd from './_museuend'
import {Toast, Loading} from 'quasar'
import helper from '../../libs/helper'

export default {
  name: 'MuseuCreate',
  components: {
    'museu-cadastro': MuseuCad,
    'museu-endereco': MuseuEnd
  },
  data () {
    return {
      Museu: {
        nome: '',
        site: '',
        email: '',
        fone1: '',
        fone2: '',
        instituicao_tipo_id: ''
      },

      MuseuEndereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade_id: ''
      },

      InstituicaoTipos: []
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      Loading.show()
      this.$http.get('/api/instituicao/tipos').then((response) => {
        this.InstituicaoTipos = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    submit () {
      var obj = Object.assign(this.Museu, this.MuseuEndereco)

      this.$http.post('/api/museus', obj).then((response) => {
        Toast.create('Museu cadastrado!')
        this.$router.push('/museus')
      }, (response) => {
        let strResp = helper.formatAsHtmlList(helper.getListError(response.data))
        Toast.create.negative({html: strResp, timeout: 25000})
      })
    }
  }

}
</script>
