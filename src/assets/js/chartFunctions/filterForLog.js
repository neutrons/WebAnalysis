export default {
  methods: {
    filterForLog(d) {
      if (this.yType === 'log(y)' && this.xType === 'log(x)') {
        return d.y > 0 && d.x > 0;
      } else if (this.xType === 'log(x)') {
        return d.x > 0;
      } else if (this.yType === 'log(y)') {
        return d.y > 0;
      }

      return d;
    },
  },
};
