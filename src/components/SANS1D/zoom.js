// eslint-disable-next-line
import * as d3 from 'd3';

export default {
  computed: {
    zoom() {
      return d3.zoom().on('zoom', this.zoomed);
    },
  },
  methods: {
    zoomed() {
      const newXScale = d3.event.transform.rescaleX(this.xScale);
      const newYScale = d3.event.transform.rescaleY(this.yScale);
      const newLine = d3.line()
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));
      const t = d3.transition().duration(0);

      this.updateAxes(newXScale, newYScale, t);
      this.updateGrids(newXScale, newYScale, t);

      // re-draw error line;
      this.g.selectAll('.error-line')
        .selectAll('line')
        .call(this.updateErrorLine, newXScale, newYScale, t);

      // re-draw error cap top;
      this.g.selectAll('.error-cap-top')
        .selectAll('line')
        .call(this.updateErrorCaps, 'top', newXScale, newYScale, t);

      // re-draw error cap top;
      this.g.selectAll('.error-cap-bottom')
        .selectAll('line')
        .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, t);

      // re-draw scatter plot;
      this.g.selectAll('.scatter')
        .selectAll('circle')
        .call(this.updateScatter, newXScale, newYScale, t);

      // re-draw line paths
      this.g.selectAll('.scatter-line')
        .selectAll('path')
        .call(this.updateLine, newLine, t);

      if (this.fileToFit !== null) this.g.select('.fitted-line').attr('d', newLine);
    },
  },
};
