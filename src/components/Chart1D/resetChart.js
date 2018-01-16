// estlint-disable-next-line
import * as d3 from 'd3';

export default {
  methods: {
    resetChart() {
      this.g.select('.zoom')
        .transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    },
  },
};
