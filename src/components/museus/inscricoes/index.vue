<template>
<div>
  <div class="layout-padding">
      <h4>{{Museu.nome}}</h4>

      <button class="primary big circular absolute-bottom-right push"
              @click="inscrever()"
              style="right: 15px; bottom: 15px; z-index:2">
        <i>add</i>
      </button>

      <div v-show="!hasEventos">
          <h5>Nenhuma inscrição realizada.</h5>
      </div>

      <div class="list">
          <div class="item multiple-lines" v-for="Evento in Museu.eventos">
              <div class="item-content has-secondary">
                  <div>{{Evento.tipo.nome}}</div>
                      <div class="item-label item-smaller">{{Evento.descricao}}</div>
                      <br/>
                      <div class="item-label item-smaller">
                          <span>
                            <date-format :value="Evento.inicio_evento"></date-format> a <date-format :value="Evento.fim_evento"></date-format>
                          </span>
                          <span>- {{Evento.hora_inicio_evento}} às {{Evento.hora_fim_evento}}</span>
                      </div>
                      <br/>
                      <div class="item-label item-smaller" v-show="!Evento.no_endereco_do_museu">Local: {{Evento.local}}</div>
                  </div>
                  <div class="item-secondary">
                        <i slot="target">more_vert
                          <q-popover ref="popover">
                              <div class="list">
                                  <div class="item item-link" @click="editEvento(Museu.evento.id)">
                                      <div class="item-content">Editar</div>
                                  </div>
                              </div>
                          </q-popover>
                      </i>
                  </div>
          </div>
      </div>

  </div>
</div>
</template>

<script>
import {Toast, Loading} from 'quasar'
import dateFormat from '../../common/date-format'

export default {
  name: 'MuseuInscricoes',

  components: {
    dateFormat
  },

  data () {
    return {
      Museu: {}
    }
  },

  computed: {
    hasEventos () {
      return (this.Museu.eventos !== undefined && this.Museu.eventos.length > 0)
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    fetchData () {
      Loading.show()
      this.$http.get('/api/eventos/museu/' + this.$route.params.id).then((response) => {
        this.Museu = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    inscrever () {
      this.$router.push('/museus/' + this.$route.params.id + '/inscrever')
    }
  }
}
</script>
