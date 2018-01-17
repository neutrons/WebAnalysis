<template>
<v-btn flat small dark :icon='isBreakpointSmall' :disabled='false'>
  <span class='hidden-sm-and-down'>Draw Selections</span>
  <v-icon :right='!isBreakpointSmall'>border_color</v-icon>
</v-btn>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'DrawBrushesButton',
  mixins: [
    isBreakpointSmall,
  ],
  methods: {
    drawBrushes() {
      // where brushes will be drawn
    },
  },
};
</script>

<style lang='scss' scoped>
</style>