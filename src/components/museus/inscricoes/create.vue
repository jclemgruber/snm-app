<template>
    <div>
        <div class="layout-padding">
            <h4>{{Museu.nome}}</h4>
            <h5>Nova Inscrição</h5>

            <inscricao-form :Museu="Museu"
                            :Evento="Evento"
                            :EventoTipos="EventoTipos"
            >
            </inscricao-form>

            <button class="primary full-width" @click="submit">Realizar Inscrição</button>
        </div>
    </div>
</template>

<script>
import {Toast, Loading} from 'quasar'
import InscricaoForm from './inscricao'
import helper from '../../../libs/helper'

export default {
  name: 'NovaInscricao',

  components: {
    'inscricao-form': InscricaoForm
  },

  data () {
    return {
      EventoTipos: [],
      Museu: {},
      Evento: {
        descricao: '',
        evento_tipo_id: '',
        no_endereco_do_museu: true,
        local: '',
        periodo: {
          from: '',
          to: ''
        },
        horario: {
          from: '',
          to: ''
        },
        latitude: '',
        longitude: ''
      }
    }
  },

  created () {
    this.fetchDataMuseu()
    this.fetchDataTipos()
  },

  methods: {
    fetchDataMuseu () {
      Loading.show()
      this.$http.get('/api/museus/' + this.$route.params.id).then((response) => {
        this.Museu = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    fetchDataTipos () {
      Loading.show()
      this.$http.get('/api/evento/tipos').then((response) => {
        this.EventoTipos = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    submit () {
      var obj = Object.assign(this.Evento, {museu_id: this.$route.params.id})

      this.$http.post('/api/eventos', obj).then((response) => {
        Toast.create('Inscrição realizada com sucesso!')
        this.$router.push('/museus/' + this.$route.params.id + '/inscricoes')
      }, (response) => {
        let strResp = helper.formatAsHtmlList(helper.getListError(response.data))
        Toast.create.negative({html: strResp, timeout: 25000})
      })
    }
  }

}
</script>
