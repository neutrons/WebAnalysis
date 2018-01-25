// eslint-disable-next-line
import * as d3 from 'd3';
import math from 'mathjs';

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
    reviseFitLine(initialValues) {
      const scope = {};
      initialValues.forEach((d) => {
        scope[d.coefficient] = d.value;
      });

      const x = this.filteredData.map(d => d.x);

      // Generate a linear space for yFitted
      const xMin = Math.min(...x);
      const xMax = Math.max(...x);
      const xFit = this.linspace(xMin, xMax, 100);
      const fitY = [];
      xFit.forEach((d) => {
        scope.x = d;

        fitY.push(math.eval(this.fitEquation, scope));
      });

      const newDataPoints = [];
      xFit.forEach((d, index) => {
        newDataPoints.push({ x: d, y: fitY[index] });
      });
      // Rescale to zoom's scale
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
      const newLine = d3.line()
        .defined(this.filterForLog)
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));

      this.g.select('.fit-line')
        .select('path')
        .data([newDataPoints])
        .attr('d', newLine)
        .style('stroke', this.colorScale(this.fileToFit))
        .style('stroke-width', '2px')
        .style('fill', 'none')
        .style('stroke-dasharray', '10, 5');
    },
  },
};
