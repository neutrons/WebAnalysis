import * as d3 from 'd3';
import errorBottomY from './errorBottomY';

export default {
  methods: {
    errorCaps(selection, direction, t = d3.transition().duration(0)) {
      // ENTER
      selection.enter().append('line')
        .attr('class', direction === 'top' ? `error-cap-top error-cap-top-${this.ID}` : `error-cap-bottom error-cap-bottom-${this.ID}`)
        .filter((d) => {
          if (this.plotScale.y.label === 'Log(Y)') {
            return d.y - d.error > 0;
          }

          return true;
        })
        .call(this.updateErrorCaps, direction, t)
        // eslint-disable-next-line
        .style('stroke', d => d.color = this.color(d.name));
    },
    updateErrorCaps(selection, direction, t = d3.transition().duration(0)) {
      // UPDATE
      selection.transition(t)
        .attr('x1', d => this.xScale(d.x) - 3.5)
        .attr('x2', d => this.xScale(d.x) + 3.5)
        // eslint-disable-next-line
        .attr('y1', d => direction === 'top' ? this.yScale(d.y + d.error) : this.yScale(d.y - d.error))
        // eslint-disable-next-line
        .attr('y2', d => direction === 'top' ? this.yScale(d.y + d.error) : this.yScale(d.y - d.error));

      // EXIT
      selection.exit().remove();
    },
    errorbarLine(selection, t = d3.transition().duration(0)) {
      // ENTER
      selection.enter()
        .append('line')
        .attr('class', `error-line error-line-${this.ID}`)
        .call(this.updateErrorLine, this.scale.yType, t)
        // eslint-disable-next-line
        .style('stroke', d => d.color = this.color(d.name));
    },
    updateErrorLine(selection, yType, t = d3.transition().duration(0)) {
      // UPDATE
      selection.transition(t)
        .attr('x1', d => this.xScale(d.x))
        .attr('x2', d => this.xScale(d.x))
        .attr('y1', d => this.yScale(d.y + d.error))
        .attr('y2', d => errorBottomY(d, yType));

      // EXIT
      selection.exit().remove();
    },
    addErrorGroup(selection) {
      selection.insert('g', ':first-child')
        .attr('clip-path', `url(#clip-${this.ID})`)
        .attr('id', `error-${this.ID}`);
    },
    errorBottomY(d, yType) {
      if (d.y - d.error < 0 && yType === 'Log(Y)') {
        return this.yScale(d.y);
      }

      return this.yScale(d.y - d.error);
    },
  },
};
