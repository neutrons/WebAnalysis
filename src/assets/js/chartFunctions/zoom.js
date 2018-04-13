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

      // redraw error bars if enabled
      if (this.isErrorBars) {
        this.g.selectAll('.error-line')
          .attr('x1', d => newXScale(d[this.fields.x]))
          .attr('y1', d => newYScale(d[this.fields.y] + d.error))
          .attr('x2', d => newXScale(d[this.fields.x]))
          .attr('y2', d => this.errorBottomY(d, newYScale));

        this.g.selectAll('.error-cap-top')
          .attr('x1', d => newXScale(d[this.fields.x]) + 4)
          .attr('y1', d => newYScale(d[this.fields.y] + d.error))
          .attr('x2', d => newXScale(d[this.fields.x]) - 4)
          .attr('y2', d => newYScale(d[this.fields.y] + d.error));

        this.g.selectAll('.error-cap-bottom')
          .attr('x1', d => newXScale(d[this.fields.x]) + 4)
          .attr('y1', d => this.errorBottomY(d, newYScale))
          .attr('x2', d => newXScale(d[this.fields.x]) - 4)
          .attr('y2', d => this.errorBottomY(d, newYScale));
      }

      // redraw scatter points if enabled
      if (this.isScatterPoints) {
        this.g.selectAll('.point')
          .attr('transform', d => `translate( ${newXScale(d[this.fields.x])}, ${newYScale(d[this.fields.y])})`);
      }

      // redraw scatter line if enabled
      if (this.isScatterLines) {
        this.g.selectAll('.scatter-line')
          .attr('d', d => newLine(d.values));
      }

      // If a fit line is present redraw it
      if (this.fileToFit) {
        this.g.select('.fitted-line').attr('d', newLine);
      }

      // If Stitch plot update brush scales according to zoom
      if (this.$route.feature === 'Stitch') {
        this.updateBrushScale();
        this.reconvertBrushSelections();
      }
    },
    rescaleToZoom() {
      // function used to rescale plot scales according to current zoom state
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);

      return [newXScale, newYScale];
    },
  },
};
