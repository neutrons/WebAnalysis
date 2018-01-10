<template>
  <v-navigation-drawer
      fixed
      v-model='drawerRight'
      right
      clipped
      app
      disable-resize-watcher
      disable-route-watcher
    >
    <v-list light>
        <v-subheader>Legend</v-subheader>
        <v-divider></v-divider>
        <div v-for='(file, index) in filesSelected' :key='index'>
          <v-list-tile>
            <v-list-tile-avatar v-if='file === fileToFit'>
              <v-icon color='black' style='font-size: 12px;'>fa-asterisk</v-icon>
            </v-list-tile-avatar>

           <v-list-tile-content>
              <v-list-tile-title v-text="file"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-avatar>
              <v-icon :style='{color: colorScale(file)}'>linear_scale</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';

export default {
  name: 'Legend',
  props: {
    drawerRight: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState('SANS1D', {
      colorDomain: state => state.colorDomain,
      filesSelected: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    colorScale() {
      return d3.scaleOrdinal(d3.schemeCategory20).domain(this.colorDomain);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>