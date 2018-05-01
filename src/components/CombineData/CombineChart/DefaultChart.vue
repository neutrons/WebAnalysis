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
import deletePoint from '../../DeletePoint/DeletePointMixins';
import togglePlotElementsMixin from '../../../assets/js/togglePlotElementsMixin';
import chartMethods from './chartMethods';
import defaultChartMixin from '../../../assets/js/chartFunctions/defaultChartMixin';

export default {
  name: 'CombineChart',
  props: {
    ID: {
      type: String,
      required: true,
    },
  },
  mixins: [
    chartMethods,
    deletePoint,
    togglePlotElementsMixin,
    defaultChartMixin,
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
    };
  },
  computed: {
    chartName() {
      return `.combine-chart-${this.ID}`;
    },
    plotData() {
      return this.chartConfigurations.data;
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
