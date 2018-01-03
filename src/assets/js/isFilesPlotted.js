export default {
  computed: {
    isFilesPlotted() {
      return this.$store.state[this.title].filesSelected.length > 0;
    },
  },
};
