<template>
  <div class="list no-border platform-delimiter">
    <quasar-drawer-link to="/temas" exact v-show="authenticated">
      Temas
    </quasar-drawer-link>
    <hr/>
    <quasar-drawer-link to="/logout" exact v-show="authenticated">
      Logout
    </quasar-drawer-link>
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
