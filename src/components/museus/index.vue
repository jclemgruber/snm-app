<template>
  <div class="layout-padding">
    <h4>Meus Museus</h4>

    <button class="primary circular absolute-bottom-right push" @click="newMuseu()">
      <i>add_circle</i>
    </button>

    <div class="card" v-for="Museu in Museus">

      <div class="card-title">
        {{Museu.nome}}
      </div>

      <div class="card-content card-force-top-padding">
        <p>
           {{Museu.enderecos[0].logradouro}}, {{Museu.enderecos[0].numero}} {{Museu.enderecos[0].complemento}} <br/>
           {{Museu.enderecos[0].bairro}}, {{Museu.enderecos[0].cidade.nome}}-{{Museu.enderecos[0].cidade.uf.abrev}} <br/>
           CEP: {{Museu.enderecos[0].cep}}
        </p>
        <p>
          {{Museu.email}} <br/>
          {{Museu.fone1}} / {{Museu.fone2}}
        </p>
      </div>

      <hr/>

      <div class="list no-border inner-delimiter">
        <div class="item">
          <div class="item-content pull-left">
              <button type="button" class="primary circular small outline" @click="editMuseu(Museu.id)"><i>settings</i></button>
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
  name: 'MuseusList',
  data () {
    return {
      Museus: []
    }
  },

  created () {
    this.loadMuseus()
  },

  methods: {
    loadMuseus () {
      Loading.show()
      this.$http.get('/api/museus').then((response) => {
        this.Museus = response.data
        Loading.hide()
      }, (response) => {
        Loading.hide()
        Toast.create.negative(response.data.error)
      })
    },

    newMuseu () {
      this.$router.push('/museus/create')
    },

    editMuseu (id) {
      this.$router.push('/museus/' + id)
    }
  }
}
</script>
