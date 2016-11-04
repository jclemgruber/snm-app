<template>
  <div class="layout-padding">
    <h4>Editar Tema: {{this.$route.params.id}}</h4>

    <tema-form :Tema="Tema"></tema-form>
    <button class="primary full-width" @click="submit">Salvar Tema</button>

  </div>
</template>

<script>
import TemaForm from './tema'
import {Toast, Loading} from 'quasar'
import helper from '../../../libs/helper'
import moment from 'moment'
const now = moment().toISOString()

export default {
  name: 'TemaUpdate',
  components: {
    TemaForm
  },

  data () {
    return {
      Tema: {
        nome: '',
        ativo: false,
        inicio_evento: now,
        fim_evento: now,
        inicio_inscricoes: now,
        fim_inscricoes: now
      }
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      Loading.show()
      this.$http.get('/api/temas/' + this.$route.params.id).then((response) => {
        this.Tema = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data)
      })
    },

    submit () {
      this.$http.patch('/api/temas/' + this.$route.params.id, this.Tema).then((response) => {
        Toast.create('Tema atualizado!')
        this.$router.push('/temas')
      }, (response) => {
        let strResp = helper.formatAsHtmlList(helper.getListError(response.data))
        Toast.create.negative({html: strResp, timeout: 25000})
      })
    }
  }
}
</script>
