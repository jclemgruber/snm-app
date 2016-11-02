<template>
  <div class="layout-padding">
    <h4>Novo Tema</h4>
    {{Tema.inicio_evento}}
    <div class="layout-view layout-padding">
      <div class="list">

        <div class="item three-lines">
          <div class="item-content">
            <div class="floating-label">
              <input v-model="Tema.nome" required class="full-width">
              <label>Nome do Tema</label>
            </div>
          </div>
        </div>

        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Ativado?</p>
            <label>
              <quasar-toggle v-model="Tema.ativo"></quasar-toogle>
            </label>
          </div>
        </div>

        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data início do evento</p>
            <quasar-datetime v-model="Tema.inicio_evento" format="DD/MM/YYYY" type="date" required class="full-width"></quasar-datetime>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data fim do evento</p>
            <quasar-datetime v-model="Tema.fim_evento" format="DD/MM/YYYY" type="date" required class="full-width"></quasar-datetime>
          </div>
        </div>

        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data início das inscrições</p>
            <quasar-datetime v-model="Tema.inicio_inscricoes" format="DD/MM/YYYY" type="date" required class="full-width"></quasar-datetime>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data fim das inscrições</p>
            <quasar-datetime v-model="Tema.fim_inscricoes" format="DD/MM/YYYY" type="date" required class="full-width"></quasar-datetime>
          </div>
        </div>

        <button class="primary full-width" @click="submit">Salvar</button>

      </div>

    </div>

  </div>
</template>

<script>
import {Toast} from 'quasar'
import helper from '../../libs/helper'
import moment from 'moment'
const now = moment().format('YYYY-MM-DD')

export default {
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
      }, (response) => {
        let strResp = helper.formatAsHtmlList(helper.getListError(response.data))
        Toast.create.negative({html: strResp, timeout: 25000})
      })
    }
  }
}
</script>
