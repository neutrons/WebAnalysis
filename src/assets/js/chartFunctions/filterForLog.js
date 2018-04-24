export default {
  methods: {
    filterForLog(d) {
      // if plot scales are set to log filter out points below zero
      // otherwise d3 throws errors since log(<0) = NaN
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
