import * as d3 from 'd3';

export default {
  computed: {
    zoom() {
      return d3.zoom().on('zoom', this.zoomed);
    },
  },
  methods: {
    zoomed() {
      // re-scale axes during zoom
      this.g.select('.axis--y')
        .call(this.yAxis.scale(d3.event.transform.rescaleY(this.yScale)));

      this.g.select('.axis--x')
        .call(this.xAxis.scale(d3.event.transform.rescaleX(this.xScale)));

      // Transform hexagons depending on the zoom
      this.g.selectAll('.hexagon')
        .attr('transform', d3.event.transform);
    },
  },
};
