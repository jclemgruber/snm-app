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
        // Tranforma os campos data considerando o Timezone afim de evitar
        // o problema da data - 1
        this.Tema.inicio_evento = moment.utc(response.data.inicio_evento).format('YYYY-MM-DD')
        this.Tema.fim_evento = moment.utc(response.data.fim_evento).format('YYYY-MM-DD')
        this.Tema.inicio_inscricoes = moment.utc(response.data.inicio_inscricoes).format('YYYY-MM-DD')
        this.Tema.fim_inscricoes = moment.utc(response.data.fim_inscricoes).format('YYYY-MM-DD')

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
        Toast.create.negative({html: helper.getTextError(response), timeout: 25000})
      })
    }
  }
}
</script>
