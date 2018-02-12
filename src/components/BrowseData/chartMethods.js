import * as d3 from 'd3';

// Import Mixins
import setResponsive from '../../assets/js/chartFunctions/setResponsive';
import getContainerWidth from '../../assets/js/chartFunctions/getContainerWidth';
import errorBars from '../../assets/js/chartFunctions/errorBars';
import scatter from '../../assets/js/chartFunctions/scatter';
import linepath from '../../assets/js/chartFunctions/linepath';
import labels from '../../assets/js/chartFunctions/labels';
import axes from '../../assets/js/chartFunctions/axes';
import grids from '../../assets/js/chartFunctions/grids';
import resetChart from '../../assets/js/chartFunctions/resetChart';
import zoom from '../../assets/js/chartFunctions/zoom';
import filterForLog from '../../assets/js/chartFunctions/filterForLog';
import removeChart from '../../assets/js/chartFunctions/removeChart';
import addClipPath from '../../assets/js/chartFunctions/addClipPath';
import addZoomGroup from '../../assets/js/chartFunctions/addZoomGroup';

export default {
  mixins: [
    setResponsive,
    errorBars,
    scatter,
    linepath,
    labels,
    axes,
    grids,
    zoom,
    resetChart,
    getContainerWidth,
    filterForLog,
    removeChart,
    addClipPath,
    addZoomGroup,
  ],
  methods: {
    drawChart() {
      if (!this.plotData.length) {
        this.svg = d3.select(`.quickplot-${this.ID}`)
          .attr('viewBox', this.viewBox)
          .attr('perserveAspectRatio', 'xMidYMid meet')
          .attr('height', this.height + this.margin.top + this.margin.bottom)
          .attr('width', this.width + this.margin.left + this.margin.right);

        this.addLabels();
        this.addClipPath();

        this.g = this.svg.append('g')
          .attr('class', 'chart-group')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.g.append('rect').attr('class', 'chart-bg')
            .attr('height', this.height)
            .attr('width', this.width)
            .style('fill', 'white');

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
        this.addZoomGroup();

        // Add chart element groups
        const group = this.g.append('g')
          .attr('class', 'quickplot-group')
          .attr('clip-path', `url(#clip-${this.ID})`);

        group.append('g').attr('class', 'error-line');
        group.append('g').attr('class', 'error-cap-top');
        group.append('g').attr('class', 'error-cap-bottom');
        group.append('g').attr('class', 'scatter-line');
        group.append('g').attr('class', 'scatter');

        this.g.select('.zoom').call(this.zoom);
      }

      if (this.plotData.length) {
        // toggle zoom on
        this.g.select('.zoom')
          .attr('pointer-events', 'all');
      }

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

      const tempData = this.plotData.filter(this.filterForLog);
      const group = this.g.select('.quickplot-group');

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
        .call(this.updateLine, newLine, trans);

      // Update scatter
      group.select('.scatter')
        .selectAll('.point')
        .data(tempData)
        .call(this.updateScatter, newXScale, newYScale, trans);

      group.select('.scatter').selectAll('path').style('fill', '#2196f3');
      group.select('.scatter-line').selectAll('path').style('stroke', '#2196f3');
      group.select('.error-line').selectAll('line').style('stroke', '#2196f3');
      group.select('.error-cap-top').selectAll('line').style('stroke', '#2196f3');
      group.select('.error-cap-bottom').selectAll('line').style('stroke', '#2196f3');
    },
  },
};
