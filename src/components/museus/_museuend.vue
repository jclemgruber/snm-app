<template>
  <div class="list">

    <div class="item three-lines">
      <i class="item-primary" @click.prevent="searchCEP">search</i>
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.cep" v-mask="'##.###-###'" required class="full-width">
          <label>CEP</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <autocomplete v-model="MuseuEndereco.cidade_id" required class="full-width"></autocomplete>
          <label>Cidade</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.logradouro" required class="full-width">
          <label>Logradouro</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.numero" required class="full-width">
          <label>Numero</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.complemento" required class="full-width">
          <label>Complemento</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="MuseuEndereco.bairro" required class="full-width">
          <label>Bairro</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Autocomplete from '../common/autocomplete'

export default {
  components: {
    Autocomplete
  },

  props: {
    MuseuEndereco: {
      type: Object
    }
  },

  data () {
    return {
      value: ''
    }
  },

  methods: {
    searchCEP () {
      if (!this.MuseuEndereco.cep) {
        return
      }

      var formattedCEP = this.MuseuEndereco.cep.split('.').join('').split('-').join('')

      if (formattedCEP.length < 8) {
        return
      }

      /* var options = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      } */

      var url = 'https://viacep.com.br/ws/' + formattedCEP + '/json'
      this.$http.get(url).then((response) => {
        console.log(response)
      }, {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}})
    }
  }
}
</script>
