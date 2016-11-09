<template>
  <div class="list">

    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="Museu.nome" required class="full-width">
          <label>Nome do Museu</label>
        </div>
      </div>
    </div>

    <hr>
      <div class="list-label">Tipo de Instiuição</div>
      <div class="item multiple-lines">
        <div class="item-content">
          <quasar-select
            class="full-width"
            type="radio"
            v-model="Museu.instituicao_tipo_id"
            :options="InstituicaoTipos"
            placeholder="Selecione o tipo do Museu"
          ></quasar-select>
        </div>
      </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="Museu.site" required class="full-width">
          <label>Site Institucional</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="Museu.email" required class="full-width">
          <label>E-mail Institucional</label>
        </div>
      </div>
    </div>

    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="Museu.fone1" required v-mask="'(##)####-####'" class="full-width">
          <label>Telefone 1</label>
        </div>
      </div>
    </div>
    <hr>
    <div class="item three-lines">
      <div class="item-content">
        <div class="floating-label">
          <input v-model="Museu.fone2" required v-mask="'(##)####-####'" class="full-width">
          <label>Telefone 2</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    Museu: {
      type: Object
    },

    InstituicaoTipos: {
      type: Array
    }
  }
}
</script>
