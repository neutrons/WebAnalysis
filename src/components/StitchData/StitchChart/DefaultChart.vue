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
              <v-flex xs12 :id='`stitch-chart-wrapper-${ID}`' text-xs-center mb-3>
                <svg :class='`chart stitch-chart stitch-chart-${ID}`' />
              </v-flex>

              <v-flex xs12>
                <v-toolbar height='auto' flat>
                  <v-container class='pa-0' fluid>
                    <v-layout row wrap class='pa-0'>
                      <v-reset-chart-button @reset-chart='resetChart' :disable='filesSelected.length === 0'></v-reset-chart-button>
                      
                      <v-edit-chart-button :disable='filesSelected.length === 0' ></v-edit-chart-button>

                      <v-toggle-plot-elements
                        :disable='plotData.length === 0'
                        :is-scatter-points='isScatterPoints'
                        :is-scatter-lines='isScatterLines'
                        :is-error-bars='isErrorBars'
                        :is-legend='isLegend'
                        @toggle-plot-element='togglePlotElement'
                      ></v-toggle-plot-elements>

                      <slot name='toolbar-slot'
                        :toggle-edit='toggleEdit'
                        :remove-brushes='removeBrushes'
                        :stitch-data='stitchData'
                        :remove-stitch-line='removeStitchLine'
                        :draw-saved-brushes='drawSavedBrushes'
                        :files-selected='filesSelected'
                      ></slot>

                      <v-spacer></v-spacer>

                      <v-btn icon flat @click='showTabs = !showTabs' v-if='stitchedData.length > 0'>
                        <v-icon small>{{ showTabs ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                      </v-btn>

                    </v-layout>
                  </v-container>
                </v-toolbar>
              </v-flex>

              <slot name='tabs-slot'
                :show-tabs='showTabs'
                :files-selected='filesSelected'
                :stitched-data='stitchedData'
                :brush-selections='brushSelections'
              ></slot>
            </v-layout>
          </v-tabs-content>

          <!-- Plotted Data Table -->
          <v-tabs-content id='data-table'>
            <v-card flat>
              <v-card-text>
                <v-plotted-data-table :plotted-data='preparedData.map(d => d.values).reduce((a,b) => a.concat(b), [])' :files='filesSelected' />
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
import chartMethods from './chartMethods';
import deletePoint from '../../DeletePoint/DeletePointMixins';
import togglePlotElementsMixin from '../../../assets/js/togglePlotElementsMixin';
import defaultChartMixin from '../../../assets/js/chartFunctions/defaultChartMixin';

export default {
  name: 'ChartStitch',
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
      showTabs: true,
    };
  },
  computed: {
    plotData() {
      return this.chartConfigurations.data;
    },
  },
  methods: {
    redrawChart() {
      if (this.filesSelected.length === 0) {
        this.showTabs = true;
        this.getContainerWidth(`#stitch-chart-wrapper-${this.ID}`);
        this.removeChart();
        this.drawChart();
      } else {
        this.drawChart();
      }
    },
  },
  mounted() {
    this.getContainerWidth(`#stitch-chart-wrapper-${this.ID}`);
    this.drawChart();
  },
};

</script>

<style lang='scss'>
@import url('../../../assets/css/plotStyles.scss');

/* override default zoomgroup styles */
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
