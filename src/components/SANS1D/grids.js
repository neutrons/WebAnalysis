// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    updateGrids(x, y, t) {
      const xg = d3.axisBottom(x)
        .ticks(10)
        .tickSize(-this.height)
        .tickFormat('');
      const yg = d3.axisLeft(y)
        .ticks(10)
        .tickSize(-this.width)
        .tickFormat('');

      this.g
        .select('.grid--x')
        .transition(t)
        .call(xg);
      this.g
        .select('.grid--y')
        .transition(t)
        .call(yg);
    },
  },
};
