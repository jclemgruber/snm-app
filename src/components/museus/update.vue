<template>
  <div class="layout-padding">
    <h4>Editar Museu {{this.$route.params.id}}</h4>

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

    <button class="primary full-width" @click="submit">Salvar Museu</button>

  </div>
</template>

<script>
import MuseuCad from './_museucad'
import MuseuEnd from './_museuend'
import {Toast, Loading} from 'quasar'
import helper from '../../libs/helper'

export default {
  name: 'MuseuUpdate',

  components: {
    'museu-cadastro': MuseuCad,
    'museu-endereco': MuseuEnd
  },

  data () {
    return {
      Museu: {},
      MuseuEndereco: {},
      InstituicaoTipos: []
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      Loading.show()
      this.$http.get('/api/museus/' + this.$route.params.id).then((response) => {
        this.Museu = response.data
        this.MuseuEndereco = response.data.enderecos[0]

        Loading.hide()
        /*
        this.$http.get('/api/instituicao/tipos').then((response) => {
          this.InstituicaoTipos = response.data
          Loading.hide()
        }, (response) => {
          Loading.hide()
          Toast.create.negative(response.data.error)
        }) */
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    submit () {
      var obj = Object.assign(this.Museu, this.MuseuEndereco)

      this.$http.patch('/api/museus/' + this.$route.params.id, obj).then((response) => {
        Toast.create('Museu atualizado!')
      }, (response) => {
        Toast.create.negative({html: helper.getTextError(response), timeout: 25000})
      })
    }
  }
}
</script>
