<template>
<v-btn flat small dark :icon='isBreakpointSmall' @click='$emit("remove-stitch")' :disabled='!isStitched'>
  <span class='hidden-md-and-down'>Remove Stitch Line</span>
  <v-icon :right='!isBreakpointSmall'>remove</v-icon>
</v-btn>
</template>

<script>
import { mapState } from 'vuex';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'RemoveStitchButton',
  mixins: [
    isBreakpointSmall,
  ],
  computed: {
    ...mapState('Stitch', {
      isStitched: state => state.stitchedData.length,
    }),
  },
};
</script>

<style lang='scss' scoped>
</style>