<template>
    <v-layout row wrap>
      <!-- Chart container -->
      <v-flex xs12 :id='`quickplot-wrapper-${ID}`' text-xs-center mb-3>
        <svg :class='`chart quickplot-${ID}`' />
      </v-flex>

      <v-flex xs12>
        <v-toolbar flat height='auto'>
          <v-container class='pa-0' fluid>
            <v-layout row wrap class='pa-0'>
              <v-reset-chart-button @reset-chart='resetChart'></v-reset-chart-button>
              <v-spacer></v-spacer>
              <!-- scatter point hover values -->
              <v-subheader class='hidden-sm-and-down' v-if='xPoint'>
                <span class='mr-2'>X: {{xPoint.toExponential(2)}}</span>
                <span class='mr-2'>Y: {{yPoint.toExponential(2)}}</span>
                <span class='mr-2'>Error: {{errorPoint.toExponential(2)}}</span>
              </v-subheader>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 v-if='isMetadata && metadataLength'>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Metadata</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click='show = !show'>
              <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
            </v-btn>
          </v-toolbar>
          <v-slide-y-transition>
            <v-card-text v-if='show'>
              <v-metadata-table :metadata='plotMetadata'></v-metadata-table>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
// Import Packages
import * as d3 from 'd3';

// Import Mixins
import setResponsive from '../../assets/js/chartFunctions/setResponsive';
import getContainerWidth from '../../assets/js/chartFunctions/getContainerWidth';
import errorBars from '../Chart1D/errorBars';
import scatter from '../Chart1D/scatter';
import linepath from '../Chart1D/linepath';
import labels from '../Chart1D/labels';
import axes from '../Chart1D/axes';
import grids from '../Chart1D/grids';
import resetChart from '../Chart1D/resetChart';
import zoom from '../Chart1D/zoom';
import filterForLog from '../Chart1D/filterForLog';
import removeChart from '../Chart1D/removeChart';

export default {
  name: 'QuickPlot',
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
  ],
  components: {
    'v-reset-chart-button': () => import('../ResetChartButton'),
    'v-metadata-table': () => import('../MetadataTable'),
  },
  data() {
    return {
      xPoint: null,
      yPoint: null,
      errorPoint: null,
      xType: 'x',
      yType: 'y',
      width: 960,
      height: 600,
      viewBox: '0 0 960 600',
      show: true,
      defaultMargin: {
        top: 20,
        right: 50,
        bottom: 50,
        left: 100,
      },
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    margin() {
      return this.defaultMargin;
    },
    xScale() {
      return d3.scaleLinear()
        .range([0, this.width])
        .domain(this.xExtent)
        .nice();
    },
    xExtent() {
      if (!this.plotData.length) {
        return [0, 0];
      }

      return d3.extent(this.plotData, d => d.x);
    },
    yScale() {
      return d3.scaleLinear()
        .range([this.height, 0])
        .domain(this.yExtent)
        .nice();
    },
    yExtent() {
      if (!this.plotData.length) {
        return [0, 0];
      }

      return d3.extent(this.plotData, d => d.y);
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeCategory20).domain([0]);
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
    line() {
      return d3.line()
        .defined(this.filterForLog)
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y));
    },
    isMetadata() {
      return !(typeof this.plotMetadata === 'undefined');
    },
    metadataLength() {
      if (!this.isMetadata) {
        return 0;
      } else if (this.plotMetadata === null) {
        return 0;
      }

      return this.plotMetadata.length;
    },
  },
  methods: {
    drawChart() {
      if (!this.plotData.length) {
        this.svg = d3.select(`.quickplot-${this.ID}`)
          .attr('viewBox', this.viewBox)
          .attr('perserveAspectRatio', 'xMidYMid meet')
          .attr('height', this.height + this.margin.top + this.margin.bottom)
          .attr('width', this.width + this.margin.left + this.margin.right);

        this.addLabels();

        const clipPath = this.svg.append('defs').append('clipPath');
        clipPath.attr('id', `clip-quickplot-${this.ID}`)
          .append('rect')
          .style('fill', 'none')
          .attr('width', this.width)
          .attr('height', this.height);

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
        this.g.append('g')
          .attr('class', 'zoom-group')
          .attr('id', `zoom-group-${this.ID}`)
          .append('g')
            .attr('id', `zoom--${this.ID}`)
            .append('rect')
            .attr('class', 'zoom')
            .attr('opacity', 0)
            .attr('cursor', 'move')
            .attr('pointer-events', 'none')
            .style('fill', 'none')
            .attr('width', this.width)
            .attr('height', this.height);

        // Add chart element groups
        const group = this.g.append('g')
          .attr('class', 'quickplot-group')
          .attr('clip-path', `url(#clip-quickplot-${this.ID})`);

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
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
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
  mounted() {
    this.getContainerWidth(`#quickplot-wrapper-${this.ID}`);
    this.drawChart();
    this.setResponsive(`quickplot-width-change-${this.ID}`, `#quickplot-wrapper-${this.ID}`, `.quickplot-${this.ID}`);
  },
  watch: {
    plotData() {
      this.$nextTick(() => {
        if (!this.plotData.length) {
          this.label = { x: 'q = x', y: 'I(q) = y' };
          this.getContainerWidth(`#quickplot-wrapper-${this.ID}`);
          this.removeChart();
          this.drawChart();
          this.setResponsive(`chart-width-change-${this.ID}`, `#quickplot-wrapper-${this.ID}`, `.chart-${this.ID}`);
        } else {
          this.drawChart();
        }
      });
    },
    title() {
      // maintain responsive charts when switching between plot components
      this.setResponsive(`quickplot-width-change-${this.ID}`, `#quickplot-wrapper-${this.ID}`, `.quickplot-${this.ID}`);
    },
  },
};
</script>

<style lang='scss'>
.axis {
  path {
    shape-rendering: optimizeQuality;
  }
  .tick text {
    font-size: 14px;
  }
  .tick line {
    shape-rendering: optimizeQuality;
    stroke: black;
  }
}

.grid .tick line {
  shape-rendering: optimizeQuality;
  stroke: gainsboro;
}

iframe.width-changed {
  width: 100%;
  display: block;
  border: 0;
  height: 0;
  margin: 0;
}

.chart {
  // Extra small screen (mobile)
  @media screen and (max-width: 599px) {
    max-height: 500px / 1.77px;
    max-width: 500px;
  } // Small screen (tablet)
  @media screen and (min-width: 600px) and (max-width: 959px) {
    max-height: 800px / 1.77px;
    max-width: 800px;
  } // Medium screen (laptop)
  @media screen and (min-width: 960px) and (max-width: 1263px) {
    max-height: 1000px / 1.77px;
    max-width: 1000px;
  } // Large screen (desktop)
  @media screen and (min-width: 1264px) and (max-width: 1903px) {
    max-height: 1500px / 1.77px;
    max-width: 1500px;
  } // Extra large screen (ultrawide)
  @media screen and (min-width: 1904px) {
    max-height: 1800px / 1.77px;
    max-width: 1800px;
  }
}

/* Override MathJax positioning for rendered elements */
.MathJax_SVG {
  position: static !important;
  display: inline-block !important;
}

foreignObject {
  height: 100px;
  width: 200px;
}

.handle {
  fill: gray;
  opacity: 0.75;
}

.zoom-group {
  .brush-container .handle {
    fill: none;
  }

  .brushes .selection {
    fill: green;
    stroke: black;
    stroke-width: 1px;
    stroke-dasharray: 3px 3px;
  }

  .brushes .handle {
    fill: none;
  }

  .brushes text {
    fill: white;
    text-anchor: end;
    letter-spacing: 1px;
  }
}
</style>