<template>
<v-btn flat small dark :disabled='false' :icon='isBreakpointSmall'>
  <span class='hidden-sm-and-down'>Save Stitch</span>
  <v-icon :right='!isBreakpointSmall'>fa-floppy-o</v-icon>
</v-btn>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'SaveStitchButton',
  mixins: [
    isBreakpointSmall,
  ],
  methods: {
    saveStitchLine() {
      // where save stitch line will go
    },
  },
};
</script>

<style lang='scss' scoped>
</style>