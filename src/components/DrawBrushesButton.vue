<template>
<v-btn flat small :icon='isBreakpointSmall' :disabled='!isBrushesStored' @click='$emit("draw-saved-brushes")'>
  <span class='hidden-md-and-down'>Draw Selections</span>
  <v-icon :right='!isBreakpointSmall'>border_color</v-icon>
</v-btn>
</template>

<script>
import { mapState } from 'vuex';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'DrawBrushesButton',
  mixins: [
    isBreakpointSmall,
  ],
  computed: {
    ...mapState('Stitch', {
      isBrushesStored: state => state.savedBrushes.length,
      filesSelected: state => state.filesSelected,
    }),
  },
};
</script>

<style lang='scss' scoped>
</style>