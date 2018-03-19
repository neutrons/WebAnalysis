export default {
  methods: {
    filterForLog(d) {
      if (this.yType === 'log(y)' && this.xType === 'log(x)') {
        return d[this.fields.y] > 0 && d[this.fields.x] > 0;
      } else if (this.xType === 'log(x)') {
        return d[this.fields.x] > 0;
      } else if (this.yType === 'log(y)') {
        return d[this.fields.y] > 0;
      }

      return d;
    },
  },
};
