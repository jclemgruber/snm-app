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
              <q-toggle v-model="Tema.ativo"></q-toogle>
            </label>
          </div>
        </div>

        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data início do evento</p>
            <q-datetime v-model="Tema.inicio_evento" type="date" required class="full-width"></q-datetime>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data fim do evento</p>
            <q-datetime v-model="Tema.fim_evento" type="date" required class="full-width"></q-datetime>
          </div>
        </div>

        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data início das inscrições</p>
            <q-datetime v-model="Tema.inicio_inscricoes"  type="date" required class="full-width"></q-datetime>
          </div>
        </div>
        <hr>
        <div class="item three-lines">
          <div class="item-content">
            <p class="caption">Data fim das inscrições</p>
            <q-datetime v-model="Tema.fim_inscricoes" type="date" required class="full-width"></q-datetime>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
export default {
  props: {
    Tema: {
      type: Object
    }
  }
}
</script>
