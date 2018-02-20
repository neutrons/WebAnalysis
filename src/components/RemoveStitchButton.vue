<template>
<v-btn flat small :icon='isBreakpointSmall' @click='$emit("remove-stitch")' :disabled='disable'>
  <span class='hidden-md-and-down'>Remove Stitch Line</span>
  <v-icon :right='!isBreakpointSmall'>remove</v-icon>
</v-btn>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'RemoveStitchButton',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    disable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>