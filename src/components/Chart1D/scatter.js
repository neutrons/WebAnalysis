// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  data() {
    return {
      xPoint: 0,
      yPoint: 0,
      errorPoint: 0,
    };
  },
  methods: {
    updateScatter(selection, x, y, t) {
      // EXIT
      selection.exit().remove();

      // UPDATE
      selection.transition(t)
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y));

      // ENTER
      selection.enter()
        .append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 4)
        .style('stroke', 'whitesmoke')
        .style('fill', d => this.colorScale(d.name))
        .on('mouseover', this.tooltipEnter);
    },
    tooltipEnter(d) {
      [this.xPoint, this.yPoint, this.errorPoint] = [d.x, d.y, d.error];
    },
  },
};
