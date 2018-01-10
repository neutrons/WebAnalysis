// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    drawChart() {
      if (this.filesSelected.length === 0 || this.fileToFit !== this.previousFit) {
        this.svg = d3.select(`.chart-${this.ID}`)
          .attr('viewBox', this.viewBox)
          .attr('perserveAspectRatio', 'xMidYMid meet')
          .attr('height', this.height + this.margin.top + this.margin.bottom)
          .attr('width', this.width + this.margin.left + this.margin.right);

        this.addLabels();

        const clipPath = this.svg.append('defs').append('clipPath');
        clipPath.attr('id', `clip-${this.ID}`)
          .append('rect')
          .style('fill', 'none')
          .attr('width', this.width)
          .attr('height', this.height);

        this.g = this.svg.append('g')
          .attr('class', 'chart-group')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.setPreviousFit(this.fileToFit);

        this.g.append('rect').attr('class', 'chart-bg')
            .attr('height', this.height)
            .attr('width', this.width);

        const grid = this.g.append('g').attr('class', 'grid');
        grid.append('g').attr('class', 'grid--x')
            .attr('transform', `translate(0, ${this.height})`)
            .call(this.xGrid);

        grid.append('g').attr('class', 'grid--y')
            .call(this.yGrid);

        const axis = this.g.append('g').attr('class', 'axis');
        axis.append('g').attr('class', 'axis--x')
            .attr('transform', `translate(0, ${this.height})`)
            .call(this.xAxis);

        axis.append('g').attr('class', 'axis--y')
            .call(this.yAxis);

        // Add Zoom Group
        this.g.append('g')
          .attr('id', `zoom-group-${this.ID}`)
          .append('g')
            .attr('id', `zoom--${this.ID}`)
            .append('rect')
            .attr('class', 'zoom')
            .attr('pointer-events', 'none')
            .style('fill', 'none')
            .attr('width', this.width)
            .attr('height', this.height);

        this.g.select('.zoom').call(this.zoom);

        if (this.fileToFit) this.initSlider();
      }

      if (this.filesSelected.length !== 0) {
        // toggle zoom on
        this.g.select('.zoom')
          .attr('pointer-events', 'all');
      }

      const trans = d3.transition().duration(750);
      // Then rescale to zoom's scale
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
      const newLine = d3.line()
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));

      this.updateAxes(newXScale, newYScale, trans);
      this.updateGrids(newXScale, newYScale, trans);
      this.updateLabels();

      // Add and update data
      this.plotData.forEach((data) => {
        if (this.g.select(`.group-${data.key}`).empty()) {
          const group = this.g.append('g')
            .attr('class', `group-${data.key}`)
            .attr('clip-path', `url(#clip-${this.ID})`);

          // Add error lines
          group.append('g').attr('class', 'error-line')
            .selectAll('line')
            .data(data.values)
            .call(this.updateErrorLine, newXScale, newYScale, trans);

          // Add error cap top
          group.append('g').attr('class', 'error-cap-top')
            .selectAll('line')
            .data(data.values)
            .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

          // Add error cap bottom
          group.append('g').attr('class', 'error-cap-bottom')
            .selectAll('line')
            .data(data.values)
            .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

          // Add line path
          group.append('g')
            .attr('class', 'scatter-line')
            .selectAll('path')
            .data([data.values])
            .call(this.updateLine, newLine, trans, data.key);

          // Add scatter points
          group.append('g').attr('class', 'scatter')
            .selectAll('circle')
            .data(data.values)
            .call(this.updateScatter, newXScale, newYScale, trans);
        } else {
          const group = this.g.select(`.group-${data.key}`);

          // Update error bars
          group.select('.error-line')
            .selectAll('line')
            .data(data.values)
            .call(this.updateErrorLine, newXScale, newYScale, trans);

          // Update error cap top
          group.select('.error-cap-top')
            .selectAll('line')
            .data(data.values)
            .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

          // Update error cap top
          group.select('.error-cap-bottom')
            .selectAll('line')
            .data(data.values)
            .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

          // Update line paths
          group.select('.scatter-line')
            .selectAll('path')
            .data([data.values])
            .call(this.updateLine, newLine, trans, data.key);

          // Update scatter
          group.select('.scatter')
            .selectAll('circle')
            .data(data.values)
            .call(this.updateScatter, newXScale, newYScale, trans);
        }
      });

      if (this.fileToFit) this.updateSlider();

      this.removeGroups();
    },
  },
};
