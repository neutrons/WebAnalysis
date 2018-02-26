import * as d3 from 'd3';

export default {
  methods: {
    updateChartElements() {
      const trans = d3.transition().duration(750);
      // Then rescale to zoom's scale
      const [newXScale, newYScale] = this.rescaleToZoom();
      const newLine = d3.line()
        .defined(this.filterForLog)
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));

      this.updateAxes(newXScale, newYScale, trans);
      this.updateGrids(newXScale, newYScale, trans);
      this.updateLabels();
      this.legend();

      // Add and update data
      this.plotData.forEach((data) => {
        // filter data for negative values when scale is log
        const tempData = data.values.filter(this.filterForLog);

        if (this.g.select(`.group-${data.key}`).empty()) {
          const group = this.g.append('g')
            .attr('class', `group-${data.key}`)
            .attr('clip-path', `url(#clip-${this.ID})`);

          // Add error lines
          group.append('g').attr('class', 'error-line')
            .selectAll('line')
            .data(tempData)
            .call(this.updateErrorLine, newXScale, newYScale, trans);

          // Add error cap top
          group.append('g').attr('class', 'error-cap-top')
            .selectAll('line')
            .data(tempData)
            .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

          // Add error cap bottom
          group.append('g').attr('class', 'error-cap-bottom')
            .selectAll('line')
            .data(tempData)
            .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

          // Add line path
          group.append('g')
            .attr('class', 'scatter-line')
            .selectAll('path')
            .data([tempData])
            .call(this.updateLine, newLine, trans, data.key);

          // Add scatter points
          group.append('g').attr('class', 'scatter')
            .selectAll('.point')
            .data(tempData)
            .call(this.updateScatter, newXScale, newYScale, trans);
        } else {
          const group = this.g.select(`.group-${data.key}`);

          // Update error bars
          group.select('.error-line')
            .selectAll('line')
            .data(tempData)
            .call(this.updateErrorLine, newXScale, newYScale, trans);

          // Update error cap top
          group.select('.error-cap-top')
            .selectAll('line')
            .data(tempData)
            .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

          // Update error cap top
          group.select('.error-cap-bottom')
            .selectAll('line')
            .data(tempData)
            .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

          // Update line paths
          group.select('.scatter-line')
            .selectAll('path')
            .data([tempData])
            .call(this.updateLine, newLine, trans, data.key);

          // Update scatter
          group.select('.scatter')
            .selectAll('.point')
            .data(tempData)
            .call(this.updateScatter, newXScale, newYScale, trans);
        }
      });
    },
  },
};
