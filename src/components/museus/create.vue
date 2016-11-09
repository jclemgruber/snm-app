<template>
  <div class="layout-padding">
    <h4>Novo Museu</h4>

      <quasar-tabs :refs="$refs" default-tab="tab-1">
        <quasar-tab name="tab-1" icon="store_mall_directory">Cadastro</quasar-tab>
        <quasar-tab name="tab-2" icon="edit_location">Endereço</quasar-tab>
      </quasar-tabs>

       <div ref="tab-1">
          <museu-cadastro :Museu="Museu" :InstituicaoTipos="InstituicaoTipos"></museu-cadastro>
       </div>

       <div ref="tab-2">
          <museu-endereco :MuseuEndereco="MuseuEndereco"></museu-endereco>
       </div>

    <button class="primary full-width" @click="submit">Criar Museu</button>

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

      InstituicaoTipos: [
        {
          label: 'Teste',
          value: '1'
        }
      ]
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
      this.$http.post('/api/museus', this.Museu).then((response) => {
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
