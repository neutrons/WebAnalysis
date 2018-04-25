export default {
  methods: {
    togglePlotElement(element) {
      // check if first time toggling, if so set default states
      // so that we can return to original values when plot is empty
      if (this.defaultPlotElementStatus === null) {
        this.setDefaultPlotElementStatus();
      }

      switch (element) {
        case 'scatterPoint':
          this.isScatterPoints = !this.isScatterPoints;
          break;
        case 'scatterLine':
          this.isScatterLines = !this.isScatterLines;
          break;
        case 'legend':
          this.isLegend = !this.isLegend;
          break;
        case 'errorBar':
        default:
          this.isErrorBars = !this.isErrorBars;
      }

      this.redrawChart();
    },
    setDefaultPlotElementStatus() {
      this.defaultPlotElementStatus = {
        isErrorBars: this.isErrorBars,
        isScatterLines: this.isScatterLines,
        isScatterPoints: this.isScatterPoints,
        isLegend: this.isLegend,
      };
    },
    resetDefaultPlotElementStatus() {
      this.isErrorBars = this.defaultPlotElementStatus.isErrorBars;
      this.isLegend = this.defaultPlotElementStatus.isLegend;
      this.isScatterLines = this.defaultPlotElementStatus.isScatterLines;
      this.isScatterPoints = this.defaultPlotElementStatus.isScatterPoints;

      this.defaultPlotElementStatus = null;
    },
  },
  watch: {
    plotData(value) {
      // reset default states if there is no data and defaults states have been altered
      if (!value.length && this.defaultPlotElementStatus !== null) {
        this.resetDefaultPlotElementStatus();
      }
    },
  },
};
