<template>
<div>
  <div class="layout-padding">
    <h4>Temas</h4>

    <button class="primary big circular absolute-bottom-right push"
            @click="newTema()"
            style="right: 15px; bottom: 15px; z-index:2">
      <i>add</i>
    </button>

    <div class="card" v-for="Tema in Temas">

      <div class="card-title" v-bind:class="{ 'bg-primary text-white': Tema.ativo }">
        {{Tema.nome}}
      </div>

      <div class="card-content card-force-top-padding">
        <p>Realização de <date-format :value="Tema.inicio_evento"></date-format> a
                         <date-format :value="Tema.fim_evento"></date-format> <br/>
           Inscrições abertas de <date-format :value="Tema.inicio_inscricoes"></date-format> a
                                 <date-format :value="Tema.fim_inscricoes"></date-format>
        </p>
      </div>

      <hr/>

      <div class="list no-border inner-delimiter">
        <div class="item">
          <div class="item-content pull-left">
              <button type="button" class="primary circular small outline" @click="editTema(Tema.id)"><i>settings</i></button>
          </div>

          <div class="item-content pull-right">
              <button type="button" class="primary circular small outline"><i>assignment</i></button>
          </div>
        </div>
      </div>

    </div>

  </div>
</div>
</template>

<script>
import { Loading, Toast } from 'quasar'
import dateFormat from '../../common/date-format'

export default {
  name: 'TemaList',
  data () {
    return {
      Temas: []
    }
  },

  components: {
    dateFormat
  },

  created () {
    this.loadTemas()
  },

  methods: {
    loadTemas () {
      Loading.show()
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
    },

    editTema (id) {
      this.$router.push('/temas/' + id)
    }
  }
}
</script>
