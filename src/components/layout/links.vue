<template>
  <div class="list no-border platform-delimiter">
    <q-drawer-link to="/temas" exact v-show="authenticated">
      Temas
    </q-drawer-link>
    <q-drawer-link to="/museus" exact v-show="authenticated">
      Museus
    </q-drawer-link>
    <hr/>
    <q-drawer-link to="/logout" exact v-show="authenticated">
      Logout
    </q-drawer-link>
  </div>
</template>

<script>
import Auth from '../../auth'

export default {
  computed: {
    authenticated () {
      return Auth.user.authenticated
    }
  }
}
</script>
