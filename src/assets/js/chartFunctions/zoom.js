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
      const [newXScale, newYScale] = this.rescaleToZoom();
      const newLine = d3.line()
        .defined(this.filterForLog)
        .x(d => newXScale(d.x))
        .y(d => newYScale(d.y));
      const trans = d3.transition().duration(0);

      this.updateAxes(newXScale, newYScale, trans);
      this.updateGrids(newXScale, newYScale, trans);

      // re-draw error line;
      this.g.selectAll('.error-line')
        .selectAll('line')
        .call(this.updateErrorLine, newXScale, newYScale, trans);

      // re-draw error cap top;
      this.g.selectAll('.error-cap-top')
        .selectAll('line')
        .call(this.updateErrorCaps, 'top', newXScale, newYScale, trans);

      // re-draw error cap top;
      this.g.selectAll('.error-cap-bottom')
        .selectAll('line')
        .call(this.updateErrorCaps, 'bottom', newXScale, newYScale, trans);

      // re-draw scatter plot;
      this.g.selectAll('.scatter')
        .selectAll('.point')
        .call(this.updateScatter, newXScale, newYScale, trans);

      // re-draw line paths
      this.g.selectAll('.scatter-line')
        .selectAll('path')
        .call(this.updateLine, newLine, trans);

      if (this.fileToFit) this.g.select('.fitted-line').attr('d', newLine);
      if (this.$route.feature === 'Stitch') {
        this.updateBrushScale();
        this.reconvertBrushSelections();
      }
    },
    rescaleToZoom() {
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);

      return [newXScale, newYScale];
    },
  },
};
