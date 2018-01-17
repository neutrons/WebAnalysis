<template>
<v-btn small flat :disabled='false' :icon='isBreakpointSmall' dark>
  <span class='hidden-sm-and-down'>Stitch</span>
  <v-icon :right='!isBreakpointSmall'>fa-line-chart</v-icon>
</v-btn>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'StitchButton',
  mixins: [
    isBreakpointSmall,
  ],
  methods: {
    stitchData() {
    // where stitch line will be
    },
  },
};
</script>

<style lang='scss' scoped>
</style>