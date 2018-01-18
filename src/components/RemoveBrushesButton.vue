<template>
<v-btn flat small dark :icon='isBreakpointSmall' @click='$emit("remove-brushes", false)'>
  <span class='hidden-sm-and-down'>Remove Selections</span>
  <v-icon :right='!isBreakpointSmall'>grid_off</v-icon>
</v-btn>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'RemoveBrushesButton',
  mixins: [
    isBreakpointSmall,
  ],
};
</script>

<style lang='scss' scoped>
</style>