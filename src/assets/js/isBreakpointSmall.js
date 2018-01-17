export default {
  computed: {
    isBreakpointSmall() {
      return this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm';
    },
  },
};
