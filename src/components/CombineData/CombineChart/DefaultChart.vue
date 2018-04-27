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
            <v-flex xs12 :id='`combine-chart-wrapper-${ID}`' text-xs-center mb-3>
              <svg :class='`chart combine-chart combine-chart-${ID}`' />
            </v-flex>

            <v-flex xs12>
              <v-toolbar height='auto' flat>
                <v-container class='pa-0' fluid>
                  <v-layout row wrap class='pa-0'>
                    <v-reset-chart-button @reset-chart='resetChart' :disable='mergedFiles.length === 0'></v-reset-chart-button>
                    
                    <v-edit-chart-button :disable='mergedFiles.length === 0' ></v-edit-chart-button>
                    
                    <v-toggle-plot-elements
                      :disable='plotData.length === 0'
                      :is-scatter-points='isScatterPoints'
                      :is-scatter-lines='isScatterLines'
                      :is-error-bars='isErrorBars'
                      :is-legend='isLegend'
                      @toggle-plot-element='togglePlotElement'
                    ></v-toggle-plot-elements>

                    <v-spacer></v-spacer>

                    <v-btn icon flat @click='showTabs = !showTabs' v-if='metadataLength > 0'>
                      <v-icon small>{{ showTabs ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                    </v-btn>

                  </v-layout>
                </v-container>
              </v-toolbar>
            </v-flex>

            <!-- Slot for Tas Combine Chart -->
            <slot name='tabs-slot' v-if='ID === "TAS-Combine"' :show-tabs='showTabs' :x-scale='xScale'
              :active-parent-tab='activeParentTab' :metadata='metadata' :metadata-length='metadataLength' :combined-data='combinedData' :merged-files='mergedFiles'></slot>

            <!-- Slot for Powder Combine Chart -->
            <slot name='tabs-slot' v-if='ID === "POWDER-Combine"' :show-tabs='showTabs' :x-scale='xScale'
              :active-parent-tab='activeParentTab' :metadata='metadata' :metadata-length='metadataLength' :combined-data='combinedData' :merged-files='mergedFiles'></slot>
          </v-layout>
        </v-tabs-content>

        <!-- Plotted Data Table -->
        <v-tabs-content id='data-table'>
          <v-card flat>
            <v-card-text>
              <v-plotted-data-table :plotted-data='plottedData' :files='mergedFiles' />
            </v-card-text>
          </v-card>
        </v-tabs-content>

      </v-tabs-items>
    </v-tabs>
  </v-flex>

  <v-slide-y-transition>
    <v-delete-point-modal
      :show='showDeleteModal'
      @cancel='resetDeletePoint'
      @delete='confirmDeletePoint'
    ></v-delete-point-modal>
  </v-slide-y-transition>
</v-container>
</template>

<script>
// Import Packages
import * as d3 from 'd3';
import deletePoint from '../../DeletePoint/DeletePointMixins';
import togglePlotElementsMixin from '../../../assets/js/togglePlotElementsMixin';

export default {
  name: 'CombineChart',
  props: {
    ID: {
      type: String,
      required: true,
    },
  },
  mixins: [
    deletePoint,
    togglePlotElementsMixin,
  ],
  components: {
    'v-reset-chart-button': () => import('../../ResetChartButton'),
    'v-plotted-data-table': () => import('../../PlottedDataTable'),
    'v-delete-point-modal': () => import('../../DeletePoint/DeletePointModal'),
    'v-toggle-plot-elements': () => import('../../TogglePlotElements'),
  },
  data() {
    return {
      svg: undefined,
      g: undefined,
      drawerRight: false,
      showTabs: true,
      width: 960,
      height: 600,
      viewBox: '0 0 960 600',
      margin: {
        top: 20,
        right: 50,
        bottom: 50,
        left: 100,
      },
      isLegend: true,
      isScatterLines: true,
      isErrorBars: true,
      isScatterPoints: true,
      defaultPlotElementStatus: null,
    };
  },
  computed: {
    chartName() {
      return `.combine-chart-${this.ID}`;
    },
    plotData() {
      return this.chartConfigurations.data;
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
    plottedData() {
      return this.preparedData.map(d => d.values).reduce((a, b) => a.concat(b), []);
    },
  },
  methods: {
    redrawChart() {
      // if no data reset chart to nothing
      if (this.plotData.length === 0) {
        this.showTabs = true;
        this.removeChart();
        this.getContainerWidth(`#combine-chart-wrapper-${this.ID}`);
      }

      this.drawChart(this.chartName, 750);
    },
  },
  mounted() {
    this.getContainerWidth(`#combine-chart-wrapper-${this.ID}`);
    this.drawChart(this.chartName, 750);
  },
};

</script>

<style lang='scss'>
@import url('../../../assets/css/plotStyles.scss');
</style>
