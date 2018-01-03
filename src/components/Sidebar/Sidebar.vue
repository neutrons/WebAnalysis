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
    <div v-if='title !== "404"'>
        <component :is='`Sidebar${title}`'></component>
    </div>  
    </v-navigation-drawer>
</template>

<script>
import SidebarSANS1D from './SANS1D/SidebarSANS1D';
import SidebarSANS2D from './SANS2D/SidebarSANS2D';
import SidebarStitch from './Stitch/SidebarStitch';
import SidebarTAS from './TAS/SidebarTAS';

/* Import Mixins */
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'Sidebar',
  components: {
    SidebarSANS1D,
    SidebarSANS2D,
    SidebarStitch,
    SidebarTAS,
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
