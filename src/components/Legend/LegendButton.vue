<template>
  <v-btn flat small :disabled='disable' @click='$emit("toggle-legend")' :icon='isBreakpointSmall'>
    <span class='hidden-sm-and-down' >Legend</span>
    <v-icon :right='!isBreakpointSmall'>fa-th-list</v-icon>
  </v-btn>  
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
