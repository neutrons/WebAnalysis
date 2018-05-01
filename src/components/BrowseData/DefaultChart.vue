<template>
    <v-layout row wrap>
      <!-- Chart container -->
      <v-flex xs12 :id='`browseplot-wrapper-${ID}`' text-xs-center mb-3>
        <svg :class='`chart browseplot-${ID}`' />
      </v-flex>

      <v-flex xs12>
        <v-toolbar flat height='auto'>
          <v-container class='pa-0' fluid>
            <v-layout row wrap class='pa-0'>
              <v-reset-chart-button :disable='plotData.length === 0' @reset-chart='resetChart'></v-reset-chart-button>

              <v-edit-chart-button :disable='plotData.length === 0' ></v-edit-chart-button>

              <v-toggle-plot-elements
                :disable='plotData.length === 0'
                :is-scatter-points='isScatterPoints'
                :is-scatter-lines='isScatterLines'
                :is-error-bars='isErrorBars'
                :is-legend='isLegend'
                @toggle-plot-element='togglePlotElement'
              ></v-toggle-plot-elements>

              <v-spacer></v-spacer>

              <v-btn icon @click='show = !show' v-if='Object.keys(selectedData).length'>
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
              </v-btn>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- data and metadata tabs  -->
      <v-flex xs12 v-if='Object.keys(selectedData).length'>
        <v-slide-y-transition>
            <v-tabs v-if='show'>
              <!-- Tabs Bar -->
              <v-tabs-bar>
                <v-tabs-item href='#metadata' ripple v-if='typeof selectedData.metadata !== "undefined"'>
                  Metadata
                </v-tabs-item>
                <v-tabs-item href='#data' ripple>
                  Data
                </v-tabs-item>
                <v-tabs-slider color='accent'></v-tabs-slider>
              </v-tabs-bar>

              <v-tabs-items>
                <!-- Plotted Data Table -->
                <v-tabs-content id='data'>
                  <v-card flat>
                    <v-card-text class='tab-card-text'>
                      <v-plotted-data-table :plotted-data='selectedData.data || []' :files='[selectedData.filename]' />
                    </v-card-text>
                  </v-card>
                </v-tabs-content>

                <v-tabs-content id='metadata'>
                  <v-card-text class='tab-card-text' v-if='typeof selectedData.metadata !== "undefined"'>
                    <v-metadata-table :metadata='selectedData.metadata || {}'></v-metadata-table>
                  </v-card-text>
                </v-tabs-content>

              </v-tabs-items>
            </v-tabs>
        </v-slide-y-transition>
      </v-flex>

      <v-slide-y-transition>
        <v-delete-point-modal
          :show='showDeleteModal'
          @cancel='resetDeletePoint'
          @delete='confirmDeletePoint'
        ></v-delete-point-modal>
      </v-slide-y-transition>
    </v-layout>
</template>

<script>
// Import Packages
import * as d3 from 'd3';

import chartMethods from './chartMethods';
import deletePoint from '../DeletePoint/DeletePointMixins';
import togglePlotElement from '../../assets/js/togglePlotElementsMixin';
import defaultChartMixin from '../../assets/js/chartFunctions/defaultChartMixin';

export default {
  name: 'DefaultBrowseChart',
  mixins: [
    chartMethods,
    deletePoint,
    togglePlotElement,
    defaultChartMixin,
  ],
  components: {
    'v-reset-chart-button': () => import('../ResetChartButton'),
    'v-metadata-table': () => import('../MetadataTable'),
    'v-plotted-data-table': () => import('../PlottedDataTable'),
    'v-delete-point-modal': () => import('../DeletePoint/DeletePointModal'),
    'v-toggle-plot-elements': () => import('../TogglePlotElements'),
  },
  data() {
    return {
      show: true,
    };
  },
  computed: {
    xType() {
      return 'x';
    },
    yType() {
      return 'y';
    },
    chartName() {
      return `.browseplot-${this.ID}`;
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

      return d3.extent(this.plotData[0].values, d => d[this.fields.x]);
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

      return d3.extent(this.plotData[0].values, d => d[this.fields.y]);
    },
    selectedData() {
      if (this.sd.length === 0) return {};

      return this.sd[0];
    },
  },
  methods: {
    redrawChart() {
      if (!this.plotData.length) {
        this.getContainerWidth(`#browseplot-wrapper-${this.ID}`);
        this.removeChart();
      }

      this.drawChart(this.chartName, 0);
    },
  },
  mounted() {
    this.getContainerWidth(`#browseplot-wrapper-${this.ID}`);
    this.drawChart(this.chartName, 0);
  },
};
</script>

<style lang='scss'>
@import url('../../assets/css/plotStyles.scss');

.tab-card-text {
  max-height: 350px;
  overflow-y: auto;
}
</style>