export default {
  computed: {
    isFileFit() {
      return this.$store.state[this.title].fileToFit !== null;
    },
  },
};
