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
        .x(d => newXScale(d[this.fields.x]))
        .y(d => newYScale(d[this.fields.y]));
      const trans = d3.transition().duration(0);

      this.updateAxes(newXScale, newYScale, trans);
      this.updateGrids(newXScale, newYScale, trans);

      // re-draw error line;
      this.g.selectAll('.error-line')
        .attr('x1', d => newXScale(d[this.fields.x]))
        .attr('y1', d => newYScale(d[this.fields.y] + d.error))
        .attr('x2', d => newXScale(d[this.fields.x]))
        .attr('y2', d => this.errorBottomY(d, newYScale));

      // re-draw error cap top;
      this.g.selectAll('.error-cap-top')
        .attr('x1', d => newXScale(d[this.fields.x]) + 4)
        .attr('y1', d => newYScale(d[this.fields.y] + d.error))
        .attr('x2', d => newXScale(d[this.fields.x]) - 4)
        .attr('y2', d => newYScale(d[this.fields.y] + d.error));

      // re-draw error cap top;
      this.g.selectAll('.error-cap-bottom')
        .attr('x1', d => newXScale(d[this.fields.x]) + 4)
        .attr('y1', d => this.errorBottomY(d, newYScale))
        .attr('x2', d => newXScale(d[this.fields.x]) - 4)
        .attr('y2', d => this.errorBottomY(d, newYScale));

      // re-draw scatter plot;
      this.g.selectAll('.point')
        .attr('transform', d => `translate( ${newXScale(d[this.fields.x])}, ${newYScale(d[this.fields.y])})`);

      // re-draw line paths
      this.g.selectAll('.scatter-line')
        .attr('d', d => newLine(d.values));

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
