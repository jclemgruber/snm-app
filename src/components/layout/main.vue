<template>
  <quasar-layout>
    <div slot="header" class="toolbar">
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      <quasar-toolbar-title :padding="1">
        Title
      </quasar-toolbar-title>
    </div>

    <!--
    <quasar-tabs slot="navigation">
      <quasar-tab icon="mail" route="/layout" exact replace>Mails</quasar-tab>
      <quasar-tab icon="alarm" route="/layout/alarm" exact replace>Alarms</quasar-tab>
      <quasar-tab icon="help" route="/layout/help" exact replace>Help</quasar-tab>
    </quasar-tabs>
    -->

    <quasar-drawer ref="drawer">
      <div class="toolbar">
        <quasar-toolbar-title>
          Drawer Title
        </quasar-toolbar-title>
      </div>


    </quasar-drawer>

    <router-view class="layout-view"></router-view>

    <div slot="footer" class="toolbar"></div>
  </quasar-layout>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
