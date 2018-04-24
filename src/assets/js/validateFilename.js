export default {
  methods: {
    validateFileName(value) {
      /* eslint-disable */
      const rg1 = /^[^\\/:\*\?'<>\|  .]+$/; // forbidden characters \ / : * ? ' < > |
      const rg2 = /^[0-9]/; // cannot start with a number ([0-9])
      const rg4 = /^[A-Za-z].*$/; // cannot start with a number ([0-9])
      const rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
      /* eslint-enable */

      if (!rg1.test(value)) {
        return 'Invalid filename.';
      } else if (rg2.test(value)) {
        return 'Do not start files with a number.';
      } else if (rg3.test(value)) {
        return 'Invalid file name.';
      } else if (!rg4.test(value)) {
        return 'Start file names with a character.';
      }

      return true;
    },
  },
};
