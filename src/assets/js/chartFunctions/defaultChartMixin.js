import * as d3 from 'd3';

export default {
  data() {
    return {
      width: 960,
      height: 600,
      viewBox: '0 0 960 600',
      defaultMargin: {
        top: 20,
        right: 50,
        bottom: 50,
        left: 100,
      },
      isLegend: true,
      isScatterLines: true,
      isErrorBars: true,
      isScatterPoints: true,
    };
  },
  computed: {
    margin() {
      return this.defaultMargin;
    },
    xScale() {
      return this.plotScale.x.value
        .range([0, this.width])
        .domain(this.xExtent)
        .nice();
    },
    yScale() {
      return this.plotScale.y.value
        .range([this.height, 0])
        .domain(this.yExtent)
        .nice();
    },
    yType() {
      return this.plotScale.y.label;
    },
    xType() {
      return this.plotScale.x.label;
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeCategory20)
        .domain(this.plotData.map(d => d.key));
    },
    isMetadata() {
      return !(typeof this.metadata === 'undefined');
    },
    metadataLength() {
      if (!this.isMetadata) {
        return 0;
      } else if (this.metadata === null) {
        return 0;
      }

      return Object.keys(this.metadata).length;
    },
    xAxis() {
      return d3.axisBottom(this.xScale);
    },
    yAxis() {
      return d3.axisLeft(this.yScale);
    },
    xGrid() {
      return d3.axisBottom(this.xScale)
        .ticks(10)
        .tickSize(-this.height)
        .tickFormat('');
    },
    yGrid() {
      return d3.axisLeft(this.yScale)
        .ticks(10)
        .tickSize(-this.width)
        .tickFormat('');
    },
    xExtent() {
      return this.getExtent(this.fields.x);
    },
    yExtent() {
      return this.getExtent(this.fields.y);
    },
    line() {
      return d3.line()
        .defined(this.filterForLog)
        .x(d => this.xScale(d[this.fields.x]))
        .y(d => this.yScale(d[this.fields.y]));
    },
  },
};
