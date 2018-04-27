export default {
  methods: {
    drawChart(chartName, duration) {
      if (this.plotData.length === 0) {
        this.initChartElements(chartName);
      }

      if (this.plotData.length !== 0) {
        // toggle zoom on
        this.g.select('.zoom')
          .attr('pointer-events', 'all');
      }

      this.updateChartElements(duration);
    },
  },
};
