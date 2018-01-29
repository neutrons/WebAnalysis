<template>
    <v-navigation-drawer
        :clipped='true'
        v-model='toggle'
        disable-resize-watcher
        disable-route-watcher
        fixed
        app
        hide-overlay
        width='450'
        mobile-break-point='600'
        :dark='$vuetify.theme.name !== "white"'
    >

    <keep-alive>
      <component :is='$route.meta.sidebar'></component>
    </keep-alive>

    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {
    SidebarSANS1D: () => import('./SANS1D/SidebarSANS1D'),
    SidebarSANS2D: () => import('./SANS2D/SidebarSANS2D'),
    SidebarStitch: () => import('./Stitch/SidebarStitch'),
    SidebarTAS: () => import('./TAS/SidebarTAS'),
    Sidebar404: () => import('./Sidebar404'),
    SidebarSANS1DBrowse: () => import('./SANS1D/SidebarSANS1DBrowse'),
    SidebarStitchBrowse: () => import('./Stitch/SidebarStitchBrowse'),
    SidebarTASBrowse: () => import('./TAS/SidebarTASBrowse'),
  },
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    toggle: {
      get() {
        return this.drawer;
      },
      set() {},
    },
  },
};
</script>

<style lang='scss'>
.chip__close {
  color: black !important;
}
</style>
