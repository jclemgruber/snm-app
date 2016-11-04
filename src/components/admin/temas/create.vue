<template>
  <div class="layout-padding">
    <h4>Novo Tema</h4>

    <tema-form v-bind:Tema="Tema"></tema-form>
    <button class="primary full-width" @click="submit">Criar Tema</button>

  </div>
</template>

<script>
import TemaForm from './tema'
import {Toast} from 'quasar'
import helper from '../../../libs/helper'
import moment from 'moment'
const now = moment().toISOString()

export default {
  name: 'TemaCreate',
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

  methods: {
    submit () {
      this.$http.post('/api/temas', this.Tema).then((response) => {
        Toast.create('Tema cadastrado!')
        this.$router.push('/temas')
      }, (response) => {
        let strResp = helper.formatAsHtmlList(helper.getListError(response.data))
        Toast.create.negative({html: strResp, timeout: 25000})
      })
    }
  }

}
</script>
