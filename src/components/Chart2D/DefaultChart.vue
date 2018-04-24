<template>
<v-container fluid pa-0>
  <v-flex xs12>
    <v-tabs>

      <!-- Tabs Bar -->
      <v-tabs-bar>
        <v-tabs-item href='#plot' ripple>
          Plot
        </v-tabs-item>
        <v-tabs-item href='#data-table' ripple>
          Data Table
        </v-tabs-item>
        <v-tabs-slider color='accent'></v-tabs-slider>
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
              <v-toolbar height='auto'>
                <v-container class='pa-0' fluid>
                  <v-layout row wrap class='pa-0'>
                    <v-reset-chart-button @reset-chart='resetChart' :disable='filesSelected === null'></v-reset-chart-button>
                    <v-edit-chart-button :disable='filesSelected === null' ></v-edit-chart-button>
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
              <v-plotted-data-table :plotted-data='plotData' :files='fileToPlot' />
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

import chartMethods from './chartMethods';

export default {
  name: 'Chart2D',
  mixins: [
    chartMethods,
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
        right: 80,
        bottom: 50,
        left: 75,
      },
    };
  },
  computed: {
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
    hexbin() {
      return d3hex.hexbin()
        .radius(this.hexBinSize)
        .extent([[0, 0], [this.width, this.height]]);
    },
  },
  mounted() {
    this.getContainerWidth(`#chart-wrapper-${this.ID}`);
    this.drawChart();
  },
  methods: {
    removeChart() {
      this.svg.selectAll('*').remove();
    },
    resetChart() {
      this.g.transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    },
    redrawChart() {
      if (this.filesSelected === null) {
        this.getContainerWidth(`#chart-wrapper-${this.ID}`);
        this.removeChart();
        this.drawChart();
      } else {
        this.drawChart();
      }
    },
  },
};

</script>

<style lang='scss'>
@import url('../../assets/css/plotStyles.scss');
</style>
