<template>
  <v-btn flat dark small :icon='isBreakpointSmall' @click='toggle = !toggle'>
    <span class='hidden-sm-and-down'>{{ !isZoomBrush ? 'Zoom' : 'Select'}}</span>
    <v-icon :right='!isBreakpointSmall'>{{ !isZoomBrush ? 'zoom_in' : 'crop_free' }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'ToggleZoomBrush',
  mixins: [
    isBreakpointSmall,
  ],
  computed: {
    ...mapState('Stitch', {
      isZoomBrush: state => state.isZoomBrush,
    }),
    toggle: {
      get() {
        return this.isZoomBrush;
      },
      set(value) {
        this.toggleZoomBrush(value);
      },
    },
    label() {
      return this.toggle ? 'Zoom' : 'Brush';
    },
  },
  methods: {
    ...mapMutations('Stitch', [
      'toggleZoomBrush',
    ]),
  },
};
</script>

<style lang='scss' scoped>
</style>