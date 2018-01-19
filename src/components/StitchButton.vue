<template>
<v-btn small flat :disabled='!isBrushes' :icon='isBreakpointSmall' dark @click='$emit("stitch-data")'>
  <span class='hidden-md-and-down'>Stitch</span>
  <v-icon :right='!isBreakpointSmall'>fa-line-chart</v-icon>
</v-btn>
</template>

<script>
import { mapState } from 'vuex';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'StitchButton',
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