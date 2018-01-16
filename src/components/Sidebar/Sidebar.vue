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
        class='grey lighten-4'
    >

    <keep-alive>
      <component :is='`Sidebar${title}`'></component>
    </keep-alive>

    </v-navigation-drawer>
</template>

<script>
/* Import Mixins */
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'Sidebar',
  components: {
    SidebarSANS1D: () => import('./SANS1D/SidebarSANS1D'),
    SidebarSANS2D: () => import('./SANS2D/SidebarSANS2D'),
    SidebarStitch: () => import('./Stitch/SidebarStitch'),
    SidebarTAS: () => import('./TAS/SidebarTAS'),
    Sidebar404: () => import('./Sidebar404'),
  },
  mixins: [
    getTitle,
  ],
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

<style lang='scss' scoped>

</style>
