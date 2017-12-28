export default {
  computed: {
    getFetched() {
      return this.$store.state[this.title].fetched;
    },
    getUploaded() {
      return this.$store.state[this.title].uploaded;
    },
    getFiles() {
      return Object.assign({}, this.getFetched, this.getUploaded);
    },
    fileKeys() {
      return Object.keys(this.getFiles);
    },
    filters() {
      return this.$store.state[this.title].filters;
    },
    filteredFiles() {
      const vm = this;

      if (this.filters.length === 0) {
        return this.fileKeys;
      }

      const temp = [];

      this.filters.forEach((tag) => {
        vm.fileKeys.forEach((name) => {
          if (this.getFiles[name].tags.indexOf(tag) > -1) {
            temp.push(name);
          }
        });
      });

      return temp;
    },
  },
};
