<template>

</template>

<script>
import Auth from '../../auth'

export default {
  data () {
    return {}
  },

  mounted () {
    Auth.logout()
    this.$router.push('/')
  }
}
</script>
