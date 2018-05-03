export default {
  methods: {
    checkName(value) {
      const str = value.trim();

      if (typeof str !== 'string') {
        this.validName = false;
        return 'Must be a string';
      } else if (str.length < 1) {
        this.validName = false;
        return 'Invalid name. Name must be 1+ characters long.';
      } else if (this.filenameList.indexOf(str) !== -1) {
        this.validName = false;
        return 'Duplice name. Name already exists.';
      } else if (str === 'combine') {
        this.validName = false;
        return 'Cannot name \'combine\'. Reserved word.';
      }

      this.validName = true;
      return true;
    },
  },
};
