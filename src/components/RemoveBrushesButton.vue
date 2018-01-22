<template>
<v-btn flat small dark :icon='isBreakpointSmall' @click='$emit("remove-brushes", false)' :disabled='!isBrushes'>
  <span class='hidden-md-and-down'>Remove Selections</span>
  <v-icon :right='!isBreakpointSmall'>grid_off</v-icon>
</v-btn>
</template>

<script>
import { mapState } from 'vuex';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'RemoveBrushesButton',
  mixins: [
    isBreakpointSmall,
  ],
  computed: {
    ...mapState('Stitch', {
      isBrushes: state => Object.keys(state.brushSelections).length,
    }),
  },
};
</script>

<style lang='scss' scoped>
</style>