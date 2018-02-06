// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    updateErrorLine(selection, x, y, t) {
      // EXIT
      selection.exit().remove();

      // ENTER
      selection.enter()
        .append('line')
        .attr('x1', d => x(d.x))
        .attr('x2', d => x(d.x))
        .attr('y1', d => y(d.y + d.error))
        .attr('y2', d => this.errorBottomY(d, y))
        // eslint-disable-next-line
        .style('stroke', (d) => {
          return typeof d.name === 'undefined' ? 'brown' : this.colorScale(d.name);
        });

      // UPDATE
      selection.transition(t)
        .attr('x1', d => x(d.x))
        .attr('x2', d => x(d.x))
        .attr('y1', d => y(d.y + d.error))
        .attr('y2', d => this.errorBottomY(d, y));
    },
    updateErrorCaps(selection, direction, x, y, t) {
      // EXIT
      selection.exit().remove();

      // ENTER
      selection.enter()
        .append('line')
        .filter((d) => {
          if (this.yType === 'log(y)') return d.y - d.error > 0;

          return true;
        })
        .attr('x1', d => x(d.x) - 4)
        .attr('x2', d => x(d.x) + 4)
        /* eslint-disable */
        .attr('y1', d => direction === 'top' ? y(d.y + d.error) : y(d.y - d.error))
        .attr('y2', d => direction === 'top' ? y(d.y + d.error) : y(d.y - d.error))
        .style('stroke', (d) => {
          return typeof d.name === 'undefined' ? 'brown' : this.colorScale(d.name);
        });
        /* eslint-enable */

      // UPDATE
      selection.transition(t)
        .attr('x1', d => x(d.x) - 4)
        .attr('x2', d => x(d.x) + 4)
        /* eslint-disable */
        .attr('y1', d => direction === 'top' ? y(d.y + d.error) : y(d.y - d.error))
        .attr('y2', d => direction === 'top' ? y(d.y + d.error) : y(d.y - d.error));
        /* eslint-enable */
    },
    errorBottomY(d, y) {
      if (d.y - d.error < 0 && this.yType === 'log(y)') return y(d.y);

      return y(d.y - d.error);
    },
  },
};
