<template>
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

      </div>

    </div>
</template>

<script>
export default {
  props: {
    Tema: {
      type: Object,
      default: function () {
        return { Tema: {} }
      }
    }
  }
}
</script>
