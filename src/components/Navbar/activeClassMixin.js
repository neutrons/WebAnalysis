export default {
  computed: {
    activeClass() {
      switch (this.$vuetify.theme.name) {
        case 'white':
          return 'my-active-white';
        case 'blue':
          return 'my-active-blue';
        default:
          return 'my-active-green';
      }
    },
  },
};
