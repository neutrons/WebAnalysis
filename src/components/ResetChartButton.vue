<template>
  <v-btn flat small @click='$emit("reset-chart")' :disabled='disable' :icon='isBreakpointSmall'>
    <span class='hidden-sm-and-down'>Reset Chart</span>
    <v-icon :right='!isBreakpointSmall' small>fa-undo</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ResetChartButton',
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isBreakpointSmall() {
      return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm';
    },
  },
};
</script>
