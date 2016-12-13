<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        SNM
      </q-toolbar-title>
      <q-drawer-link to="/home" exact><i>home</i></q-drawer-link>
    </div>

    <q-drawer swipe-only ref="drawer">
      <div class="card bg-teal text-white" v-show="authenticated">
        <div class="card-title">
          <i>account_circle</i><span> {{ user.name }}</span>
        </div>
        <div class="card-content">
          {{ user.email }}
        </div>
      </div>

      <snm-links></snm-links>
    </q-drawer>

    <router-view class="layout-view"></router-view>

    <!--div slot="footer" class="toolbar"></div-->
  </q-layout>
</template>

<script>
import { SessionStorage } from 'quasar'
import Auth from '../../auth'
import Links from './links'

export default {
  name: 'Main',

  components: {
    'snm-links': Links
  },

  data () {
    return {
      user: SessionStorage.get.item('user')
    }
  },

  computed: {
    authenticated () {
      return Auth.user.authenticated
    }
  }
}
</script>
