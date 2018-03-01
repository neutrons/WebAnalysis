<template>
  <v-btn flat small @click='$emit("reset-chart")' :disabled='disable' :icon='isBreakpointSmall'>
    <span class='hidden-md-and-down'>Reset Plot</span>
    <v-icon :right='!isBreakpointSmall' small>fa-undo</v-icon>
  </v-btn>
</template>

<script>
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'ResetChartButton',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
