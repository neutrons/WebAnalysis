// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    updateLine(selection, line, t, key) {
      // ENTER
      selection.enter()
         .append('path')
         .attr('d', line)
         .style('fill', 'none')
         .style('stroke', this.colorScale(key));

      // UPDATE
      selection.transition(t)
          .attr('d', line);
    },
  },
};
