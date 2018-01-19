export default {
  computed: {
    isBreakpointSmall() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
