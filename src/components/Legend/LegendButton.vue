<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
  <v-btn slot='activator' flat small :disabled='disable' @click='$emit("toggle-legend")' :icon='isBreakpointSmall'>
    <span class='hidden-md-and-down' >Legend</span>
    <v-icon :right='!isBreakpointSmall'>fa-th-list</v-icon>
  </v-btn>
  <span>Click to toggle legend</span>
</v-tooltip>
</template>

<script>
import isBreakpointSmall from '../../assets/js/isBreakpointSmall';

export default {
  name: 'LegendButton',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    disable() {
      if (this.disable) this.$emit('close-legend');
    },
  },
};
</script>
