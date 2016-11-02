<template>
  <div class="layout-padding">
    <h4>Temas</h4>

    <button class="primary circular absolute-bottom-right push" @click="newTema()">
      <i>add_circle</i>
    </button>

    <div class="card" v-for="Tema in Temas">

      <div class="card-title">
        {{Tema.nome}}
      </div>

      <div class="card-content">
        <p>Evento realizado no período de {{Tema.inicio_evento}} a {{Tema.fim_evento}}.<p>
        <p>Inscrições abertas de {{Tema.inicio_inscricoes}} a {{Tema.fim_inscricoes}}</p>
      </div>

      <hr/>

      <div class="list no-border inner-delimiter">
        <div class="item">
          <div class="item-content pull-left">
              <button type="button" class="primary circular small outline"><i>settings</i></button>
          </div>

          <div class="item-content pull-right">
              <button type="button" class="primary circular small outline"><i>assignment</i></button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { Loading, Toast } from 'quasar'

export default {
  data () {
    return {
      Temas: []
    }
  },

  created () {
    this.loadTemas()
  },

  methods: {
    loadTemas () {
      Loading.show({delay: 100})
      this.$http.get('/api/temas').then((response) => {
        this.Temas = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    newTema () {
      this.$router.push('/temas/create')
    }
  }
}
</script>
