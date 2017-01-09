<template>
<div>
  <div class="layout-padding">
    <h5>Instituições</h5>

    <button class="primary big circular absolute-bottom-right push"
            @click="newMuseu()"
            style="right: 15px; bottom: 15px; z-index:2">
      <i>add</i>
    </button>

    <div class="list">
        <div class="item multiple-lines" v-for="Museu in Museus">
            <div class="item-content has-secondary">
                <div>{{Museu.nome}}</div>
                <div class="item-label item-smaller">{{Museu.enderecos[0].logradouro}},
                                                      {{Museu.enderecos[0].numero}}
                                                      {{Museu.enderecos[0].complemento}}
                </div>
                <div class="item-label item-smaller">{{Museu.enderecos[0].bairro}},
                                                      {{Museu.enderecos[0].cidade.nome}}-{{Museu.enderecos[0].cidade.uf.abrev}}
                </div>
                <div class="item-label item-smaller">CEP: {{Museu.enderecos[0].cep}}</div>
                <br/>
                <div class="item-label item-smaller">{{Museu.email}}</div>
                <div class="item-label item-smaller">{{Museu.fone1}} <span v-show="hasFone2(Museu)">/</span> {{Museu.fone2}}</div>
            </div>
            <div class="item-secondary">
                <i slot="target">more_vert
                    <q-popover ref="popover">
                        <div class="list">
                            <div class="item item-link" @click="editMuseu(Museu.id)">
                                <div class="item-content">Editar</div>
                            </div>
                            <div class="item item-link" @click="inscricoes(Museu.id)">
                                <div class="item-content">Inscrições</div>
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
    },

    inscricoes (id) {
      this.$router.push('/museus/' + id + '/inscricoes')
    },

    hasFone2 (Museu) {
      return Museu.fone2 !== undefined
    }
  }
}
</script>
