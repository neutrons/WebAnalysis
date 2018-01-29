// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    updateAxes(x, y, t) {
      const xa = d3.axisBottom(x);
      const ya = d3.axisLeft(y);

      this.g.select('.axis--x')
        .transition(t)
        .call(xa);

      this.g.select('.axis--y')
        .transition(t)
        .call(ya);
    },
  },
};
