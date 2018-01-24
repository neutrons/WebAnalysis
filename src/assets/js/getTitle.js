export default {
  computed: {
    title() {
      return this.$route.meta.title.split('-')[0];
    },
  },
};
