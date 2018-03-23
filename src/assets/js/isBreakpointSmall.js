export default {
  computed: {
    isBreakpointSmall() {
      // Function to identify window size to dynamically style buttons
      // from default size to icons
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
