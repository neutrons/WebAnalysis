// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    updateAxes(x, y, t) {
      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);

      this.g.select('.axis--x')
        .transition(t)
        .call(xAxis);

      this.g.select('.axis--y')
        .transition(t)
        .call(yAxis);
    },
  },
};
