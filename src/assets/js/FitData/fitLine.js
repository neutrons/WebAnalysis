// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    initFitLine() {
      // Add fitted line
      this.g.append('g')
        .attr('class', 'fit-line')
        .attr('clip-path', `url(#clip-${this.ID})`)
        .append('path')
        .attr('class', 'fitted-line');
    },
    updateFitLine() {
      // Rescale to zoom's scale
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
      const newLine = d3.line()
        .defined(this.filterForLog)
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));

      // Re-draw plot lines with new data
      const tempData = this.fittedData.filter(this.filterForLog);
      this.g.select('.fit-line')
        .select('path')
        .data([tempData])
        .attr('d', newLine)
        .style('stroke', this.colorScale(this.fileToFit))
        .style('stroke-width', '2px')
        .style('fill', 'none')
        .style('stroke-dasharray', '10, 5');
    },
  },
};
