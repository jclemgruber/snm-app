<template>
    <div>
        <div class="layout-padding">
            <h4>{{Museu.nome}}</h4>
            <h5>Nova Inscrição</h5>

            <div class="list">

                <div class="list-label">Tipo do evento</div>
                <div class="item multiple-lines">
                  <div class="item-content">
                    <q-select
                      class="full-width"
                      type="radio"
                      v-model="Evento.evento_tipo_id"
                      :options="EventoTipos"
                    ></q-select>
                  </div>
                </div>
                <hr/>

                <div class="item multiple-lines">
                    <div class="item-content">
                        <div class="floating-label">
                            <textarea v-model="Evento.descricao" required class="full-width"></textarea>
                            <label>Descrição do evento</label>
                        </div>
                    </div>
                </div>
                <hr/>

                <div class="item multiple-lines">
                    <div class="item-content">
                        <label>
                            <q-toggle v-model="Evento.no_endereco_do_museu"></q-toggle>
                            No mesmo endereço do Museu
                        </label>
                    </div>
                </div>

                <div class="item multiple-lines" v-if="!Evento.no_endereco_do_museu">
                    <div class="item-content">
                        <div class="floating-label">
                            <input v-model="Evento.local" required class="full-width">
                            <label>Local de realização do evento</label>
                        </div>

                        <div class="floating-label">
                            <input v-model="Evento.latitude" required class="full-width">
                            <label>Latitude</label>
                        </div>

                        <div class="floating-label">
                            <input v-model="Evento.longitude" required class="full-width">
                            <label>Longitude</label>
                        </div>
                    </div>
                </div>
                <hr/>

                <div class="item multiple-lines">
                    <div class="item-content">
                        <div class="label">Período de realização do evento</div>
                        <q-datetime-range
                          type="date"
                          v-model="Evento.periodo"
                          ok-label="Ok"
                          cancel-label="Cancelar"
                        >
                        </q-datetime>
                    </div>
                </div>
                <hr/>

                <div class="item multiple-lines">
                    <div class="item-content">
                        <div class="label">Horário de realização do evento</div>
                        <q-datetime-range
                          type="time"
                          v-model="Evento.horario"
                          ok-label="Ok"
                          cancel-label="Cancelar"
                        >
                        </q-datetime>
                    </div>
                </div>
                <hr/>

            </div>

        </div>
    </div>
</template>

<script>
import {Toast, Loading} from 'quasar'

export default {
  name: 'Inscrever',

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
      this.$http.get('/api/eventos/museu/' + this.$route.params.id).then((response) => {
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
    }
  }

}
</script>
