<template>
  <div class="list">

    <div class="item three-lines">
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

    <hr>
    <div class="list-label">Tipo de Instiuição</div>
    <div class="item multiple-lines">
      <div class="item-content">
        <quasar-search v-model="searchModel" @click="searchCidade"></quasar-search>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    MuseuEndereco: {
      type: Object
    }
  },

  data () {
    return {
      searchModel: ''
    }
  },

  methods: {
    searchCidade () {
      console.log(this.searchModel)
    }
  }
}
</script>
