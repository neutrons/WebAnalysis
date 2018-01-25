<template>
<v-container fluid pa-0>
  <v-flex xs12>
    <v-tabs>

      <!-- Tabs Bar -->
      <v-tabs-bar class='blue' dark>
        <v-tabs-item href='#plot' ripple>
          Plot
        </v-tabs-item>
        <v-tabs-item href='#data-table' ripple>
          Data Table
        </v-tabs-item>
        <v-tabs-slider color='yellow'></v-tabs-slider>
      </v-tabs-bar>

      <!-- First level of tab items  -->
      <v-tabs-items>
        <v-tabs-content id='plot'>
          <v-layout row wrap>

            <!-- Chart container -->
            <v-flex xs12 :id='`chart-wrapper-${ID}`' text-xs-center mb-3>
              <svg :class='`chart chart-${ID}`' />
            </v-flex>

            <v-flex xs12>
              <v-toolbar color='blue' dark height='auto'>
                <v-container class='pa-0' fluid>
                  <v-layout row wrap class='pa-0'>
                    <v-reset-chart-button @reset-chart='resetChart' :disable='filesSelected === null'></v-reset-chart-button>
                    <v-export-chart-button :ID='ID' :disable='filesSelected === null'></v-export-chart-button>

                    <v-spacer></v-spacer>
                    <!-- scatter point hover values -->
                    <v-subheader class='hidden-sm-and-down white--text' v-if='filesSelected !== null && xPoint !== null'>
                      <span class='mr-2'>Qx: {{xPoint.toExponential(2)}}</span>
                      <span class='mr-2'>Qy: {{yPoint.toExponential(2)}}</span>
                      <span class='mr-2'>Intensity: {{intensityPoint.toExponential(2)}}</span>
                    </v-subheader>
                  </v-layout>
                </v-container>
              </v-toolbar>
            </v-flex>
          </v-layout>
        </v-tabs-content>

        <!-- Plotted Data Table -->
        <v-tabs-content id='data-table'>
          <v-card flat>
            <v-card-text>
              <!-- <v-plotted-data-table :plotted-data='preparedData' /> -->
              Some data table.
            </v-card-text>
          </v-card>
        </v-tabs-content>

      </v-tabs-items>
    </v-tabs>
  </v-flex>
</v-container>

</template>

<script>
// Import Packages
import * as d3 from 'd3';
import * as d3hex from 'd3-hexbin';

// Import Mixins
import setResponsive from '../../assets/js/chartFunctions/setResponsive';
import getContainerWidth from '../../assets/js/chartFunctions/getContainerWidth';
import axes from '../Chart1D/axes';

export default {
  name: 'Chart2D',
  mixins: [
    setResponsive,
    getContainerWidth,
    axes,
  ],
  props: {
    ID: {
      type: String,
      required: true,
    },
  },
  components: {
    'v-reset-chart-button': () => import('../ResetChartButton'),
    'v-plotted-data-table': () => import('../PlottedDataTable'),
    'v-export-chart-button': () => import('../ExportChartButton'),
  },
  data() {
    return {
      svg: undefined,
      g: undefined,
      width: 960,
      height: 600,
      legendWidth: 25,
      viewBox: '0 0 960 600',
      defaultMargin: {
        top: 20,
        right: 75,
        bottom: 20,
        left: 75,
      },
      xPoint: null,
      yPoint: null,
      intensityPoint: null,
    };
  },
  computed: {
    title() {
      return this.$route.meta.title;
    },
    margin() {
      return this.defaultMargin;
    },
    plotData() {
      if (!this.chartConfigurations.data.length) return [];

      return this.chartConfigurations.data;
    },
    xScale() {
      return d3.scaleLinear().range([0, this.width])
        .domain(d3.extent(this.plotData, d => d.qx));
    },
    yScale() {
      return d3.scaleLinear().range([this.height, 0])
        .domain(d3.extent(this.plotData, d => d.qy));
    },
    xAxis() {
      return d3.axisBottom(this.xScale).ticks(10);
    },
    yAxis() {
      return d3.axisLeft(this.yScale).ticks(10);
    },
    zoom() {
      return d3.zoom().on('zoom', this.zoomed);
    },
    hexbin() {
      return d3hex.hexbin()
        .radius(this.hexBinSize)
        .extent([[0, 0], [this.width, this.height]]);
    },
  },
  mounted() {
    this.getContainerWidth(`#chart-wrapper-${this.ID}`);
    this.drawChart();
    this.setResponsive(`chart-width-change-${this.ID}`, `#chart-wrapper-${this.ID}`, `.chart-${this.ID}`);
  },
  methods: {
    drawChart() {
      if (this.filesSelected === null) {
        // Add tool tip and hide it until invoked
        this.svg = d3.select(`.chart-${this.ID}`)
          .attr('viewBox', this.viewBox)
          .attr('perserveAspectRatio', 'xMidYMid meet')
          .attr('height', this.height + this.margin.top + this.margin.bottom)
          .attr('width', this.width + this.margin.left + this.margin.right);

        // Add clip path so hexagons do not exceed boundaries
        this.svg.append('defs').append('clipPath')
          .attr('id', `clip-${this.ID}`)
          .append('rect')
          .style('fill', 'none')
          .attr('width', this.width)
          .attr('height', this.height);

        this.g = this.svg.append('g')
          .attr('class', 'chart-group')
          .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        // Add Zoom Group
        this.g.append('g')
          .attr('class', 'zoom-group')
          .attr('id', `zoom-group-${this.ID}`)
          .append('g')
            .attr('id', `zoom--${this.ID}`)
            .append('rect')
            .attr('class', 'zoom')
            .attr('opacity', 0)
            .attr('pointer-events', 'none')
            .style('fill', 'none')
            .attr('width', this.width)
            .attr('height', this.height);

        this.g.append('g').attr('class', 'chart-area')
          .attr('clip-path', `url(#clip-${this.ID})`)
          .append('g')
          .attr('class', 'hexagon');

        // Add axes
        const axe = this.g.append('g').attr('class', 'axis');

        axe.append('g').attr('class', 'axis--y');

        axe.append('g')
          .attr('class', 'axis--x')
          .attr('transform', `translate(0, ${this.height})`);

        // Add legend
        const legend = this.svg.append('g')
          .attr('class', 'legend')
          .attr('transform', `translate(${this.width + this.margin.left + 5}, ${this.margin.top})`);

        legend.append('g')
            .attr('class', 'leg-bars');

        legend.append('g')
            .attr('transform', `translate(${this.legendWidth}, 0)`)
            .attr('class', 'legend-axis legend-axis-y');
      } else {
        // toggle zoom on
        this.g.select('.zoom').attr('pointer-events', 'all');
        this.g.call(this.zoom);
      }

      const trans = d3.transition().duration(750);
      const t = d3.zoomTransform(this.g.select('.zoom').node());
      const newXScale = t.rescaleX(this.xScale);
      const newYScale = t.rescaleY(this.yScale);
      this.updateAxes(newXScale, newYScale, trans);

      if (this.plotData.length) {
        // Create points, which are used to plot hexbins
        const points = [];

        this.plotData.forEach((el) => {
          points.push([
            this.xScale(el.qx),
            this.yScale(el.qy),
            el.intensity,
          ]);
        });

        const hexbins = this.hexbin(points);
        for (let i = 0; i < hexbins.length; i += 1) {
          const sum = hexbins[i].reduce((a, b) => a + b[2], 0);
          const avg = sum / hexbins[i].length;
          hexbins[i].avgIntensity = avg;
        }

        // Create a value range for the legend color scale
        const valRange = hexbins.length ? d3.extent(hexbins, d => d.avgIntensity) : [0, 0];
        // Create color scale generator for legend using Viridis color set
        const colorScale = d3.scaleSequential(d3.interpolateViridis)
          .domain(d3.extent(valRange));

        /* ********************************************************
            An interval is calculated to represent each 'slice' of the
            legend's color values. Each 'slice' will be stacked together
            to display the legend's vertical bar.

            Since height and range change depending on the data and
            size of chart, we dynamically find the interval
            e.g.) The extent of the average intensity = [-1, 1]
                The height = 400
                The interval = (1 - (-1)) / 400
        ************************************************************* */

        const interval = (valRange[1] - valRange[0]) / this.height;
        const legendData = d3.range(valRange[1], valRange[0], -interval);
        // Re-draw Legend
        const legendSelect = this.svg.select('.legend')
          .select('.leg-bars')
          .selectAll('.bars')
          .data(legendData);

        // EXIT LEGEND BARS
        legendSelect.exit().remove();

        // // ENTER LEGEND BARS
        legendSelect.enter()
          .append('rect')
          .attr('class', 'bars')
          .attr('x', 0)
          .attr('y', (d, i) => i)
          .attr('height', 1)
          .attr('width', this.legendWidth)
          .style('fill', d => colorScale(d));

        // Create legend scale generator
        const legendScale = d3.scaleLinear()
          .range([this.legendHeight, 0])
          .domain(colorScale.domain())
          .nice();

        this.svg.select('.legend')
          .select('.legend-axis-y')
          .call(d3.axisRight(legendScale).ticks(10));

        // EXIT HEXAGONS
        this.g.select('.hexagon').selectAll('.hexagons').remove();

        // ENTER HEXAGONS
        this.g.select('.hexagon').selectAll('path')
          .data(hexbins).enter()
          .append('path')
          .attr('d', this.hexbin.hexagon(this.hexBinSize))
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
          .attr('fill', d => colorScale(d.avgIntensity))
          .attr('stroke', d => colorScale(d.avgIntensity))
          .attr('class', 'hexagons')
          .on('mouseover', (d) => {
            this.xPoint = this.xScale.invert(d.x);
            this.yPoint = this.yScale.invert(d.y);
            this.intensityPoint = d.avgIntensity;
          });
      }
    },
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
    removeChart() {
      this.svg.selectAll('*').remove();
    },
    resetChart() {
      this.g.transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    },
  },
  watch: {
    chartConfigurations: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          if (this.filesSelected === null) {
            this.xPoint = null;
            this.yPoint = null;
            this.intensityPoint = null;
            this.getContainerWidth(`#chart-wrapper-${this.ID}`);
            this.removeChart();
            this.drawChart();
            this.setResponsive(`chart-width-change-${this.ID}`, `#chart-wrapper-${this.ID}`, `.chart-${this.ID}`);
          } else {
            this.drawChart();
          }
        });
      },
    },
    title() {
      // maintain responsive charts when switching between plot components
      this.setResponsive(`chart-width-change-${this.ID}`, `#chart-wrapper-${this.ID}`, `.chart-${this.ID}`);
    },
  },
};

</script>

<style lang='scss'>
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
</style>
