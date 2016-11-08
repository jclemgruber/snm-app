<template>
  <div class="layout-padding">
    <h4>Novo Museu</h4>

    <museu-form :Museu="Museu" :InstituicaoTipos="InstituicaoTipos"></museu-form>
    <button class="primary full-width" @click="submit">Criar Museu</button>

  </div>
</template>

<script>
import MuseuForm from './museu'
import {Toast, Loading} from 'quasar'
import helper from '../../libs/helper'

export default {
  name: 'MuseuCreate',
  components: {
    'museu-form': MuseuForm
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
