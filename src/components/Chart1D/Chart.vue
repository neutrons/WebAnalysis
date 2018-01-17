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
                      <v-reset-chart-button @reset-chart='resetChart' :disable='filesSelected.length === 0'></v-reset-chart-button>
                      <v-export-chart-button :ID='ID' :disable='filesSelected.length === 0'></v-export-chart-button>
                      <v-legend-button @toggle-legend='drawerRight = !drawerRight' @close-legend='drawerRight = false' :disable='filesSelected.length === 0'></v-legend-button>

                      <v-spacer></v-spacer>
                      <!-- scatter point hover values -->
                      <v-subheader class='hidden-xs-only white--text' v-if='filesSelected.length > 0 && xPoint'>
                        <span class='mr-2'>X: {{xPoint.toExponential(2)}}</span>
                        <span class='mr-2'>Y: {{yPoint.toExponential(2)}}</span>
                        <span class='mr-2'>Error: {{errorPoint.toExponential(2)}}</span>
                      </v-subheader>
                      <v-spacer></v-spacer>
                      <v-btn :icon='!isBreakpointSmall' flat @click='showTabs = !showTabs' v-if='fileToFit || metadataLength > 0'>
                        <v-icon small>{{ showTabs ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-container>
                </v-toolbar>
              </v-flex>

              <v-slide-y-transition>
                <v-flex xs12>
                  <div v-show='showTabs'>
                    <v-tabs v-model='activeParentTab'>

                        <v-tabs-bar dark color='blue lighten-1' v-if='fileToFit || metadataLength > 0'>
                            <v-tabs-item href='#tab-fit' ripple v-if='fileToFit'>Fit</v-tabs-item>
                            <v-tabs-item href='#tab-metadata' ripple v-if='metadataLength > 0'>Metadata</v-tabs-item>
                            <v-tabs-slider color='yellow'></v-tabs-slider>
                        </v-tabs-bar>

                        <!-- nested tab items  -->
                        <v-tabs-items>
                          <!-- fit results tab content -->
                          <v-tabs-content id='tab-fit' ripple v-if='fileToFit'>
                            <v-tabs>
                              <v-tabs-bar dark color='blue lighten-3'>
                                <v-tabs-slider color='yellow'></v-tabs-slider>
                                <v-tabs-item href='fit-results'>
                                  Fit Results
                                </v-tabs-item>

                                <v-tabs-item href='fit-data'>
                                  Fitted Data
                                </v-tabs-item>
                              </v-tabs-bar>

                              <v-tabs-items>
                                <v-tabs-content id='fit-results'>
                                    <v-card flat>
                                      <v-card-text>
                                        <v-fit-results-table :x-scale='xScale'></v-fit-results-table>
                                      </v-card-text>
                                    </v-card>
                                </v-tabs-content>

                                <v-tabs-content id='fit-data'>
                                    <v-fitted-data-table :fitted-data='fittedData' :file-to-fit='fileToFit'></v-fitted-data-table>
                                </v-tabs-content>
                                </v-tabs-items>
                            </v-tabs>
                          </v-tabs-content>

                          <!-- metadata tab content -->
                          <v-tabs-content id='tab-metadata' ripple v-if='metadataLength > 0'>
                            <v-tabs mobile-break-point='300px'>
                              <v-tabs-bar dark color='blue lighten-3'>
                                <v-tabs-slider color='yellow'></v-tabs-slider>
                                <v-tabs-item v-for='(item, filename) in metadata' :key='filename' :href='`#md-${filename}`'>
                                    {{filename}}
                                </v-tabs-item>
                              </v-tabs-bar>
                            
                              <v-tabs-items>
                                <v-tabs-content v-for='(item, filename) in metadata' :key='filename' :id='`md-${filename}`'>
                                    <v-card flat>
                                      <v-card-text v-if='metadataLength > 0'>
                                        <v-metadata-table :metadata='item'></v-metadata-table>
                                      </v-card-text>

                                      <v-card-text v-else>
                                        No metadata to be shown.
                                      </v-card-text>
                                    </v-card>
                                </v-tabs-content>
                              </v-tabs-items>
                            </v-tabs>
                          </v-tabs-content>
                        </v-tabs-items>
                    <!-- end of nested tab items -->
                    </v-tabs>
                  </div>
                </v-flex>
              </v-slide-y-transition>
            </v-layout>
          </v-tabs-content>

          <!-- Plotted Data Table -->
          <v-tabs-content id='data-table'>
            <v-card flat>
              <v-card-text>
                <v-plotted-data-table :plotted-data='preparedData'/>
              </v-card-text>
            </v-card>
          </v-tabs-content>

        </v-tabs-items>
      </v-tabs>
  </v-flex>

  <v-legend
    :drawer-right='drawerRight'
    :color-scale='colorScale'
    :files-selected='filesSelected'
    :file-to-fit='fileToFit'></v-legend>
</v-container>
</template>

<script>
// Import Packages
import * as d3 from 'd3';

// Import Mixins
import setResponsive from '../../assets/js/chartFunctions/setResponsive';
import getContainerWidth from '../../assets/js/chartFunctions/getContainerWidth';
import slider from '../../assets/js/FitData/slider';
import errorBars from './errorBars';
import scatter from './scatter';
import linepath from './linepath';
import labels from './labels';
import removeGroups from './removeGroups';
import removeChart from './removeChart';
import axes from './axes';
import grids from './grids';
import resetChart from './resetChart';
import zoom from './zoom';
import drawChart from './drawChart';
import isBreakpointSmall from '../../assets/js/isBreakpointSmall';

export default {
  name: 'Chart',
  mixins: [
    setResponsive,
    slider,
    errorBars,
    scatter,
    linepath,
    labels,
    removeGroups,
    removeChart,
    axes,
    grids,
    zoom,
    resetChart,
    getContainerWidth,
    drawChart,
    isBreakpointSmall,
  ],
  props: {
    ID: {
      type: String,
      required: true,
    },
  },
  components: {
    'v-legend-button': () => import('../Legend/LegendButton'),
    'v-legend': () => import('../Legend/Legend'),
    'v-export-chart-button': () => import('../ExportChartButton'),
    'v-reset-chart-button': () => import('../ResetChartButton'),
    'v-metadata-table': () => import('../MetadataTable'),
    'v-fitted-data-table': () => import('../FittedDataTable'),
    'v-plotted-data-table': () => import('../PlottedDataTable'),
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
    title() {
      return this.$route.meta.title;
    },
    margin() {
      if (this.fileToFit) {
        return this.sliderMargin;
      }

      return this.defaultMargin;
    },
    plotData() {
      return this.chartConfigurations.data;
    },
    xScale() {
      return this.plotScale.x.value
        .range([0, this.width])
        .domain(this.xExtent);
    },
    yScale() {
      return this.plotScale.y.value
        .range([this.height, 0])
        .domain(this.yExtent);
    },
    yType() {
      return this.plotScale.y.label;
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeCategory20).domain(this.colorDomain);
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
      return this.getExtent('x');
    },
    yExtent() {
      return this.getExtent('y');
    },
    line() {
      return d3.line()
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y));
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
  },
  mounted() {
    this.getContainerWidth();
    this.drawChart();
    this.setResponsive();
  },
  watch: {
    chartConfigurations: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          console.log('chart configs changed...');
          if (this.filesSelected.length === 0 || this.fileToFit !== this.previousFit) {
            this.showTabs = true;
            this.getContainerWidth();
            this.removeChart();
            this.drawChart();
            this.setResponsive();
          } else {
            this.drawChart();
          }
        });
      },
    },
    title() {
      // maintain responsive charts when switching between plot components
      this.setResponsive();
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

circle:hover {
  transition: all 0.1s ease;
  transform-origin: center;
  transform: scale(3);
}

.handle {
  fill: gray;
  opacity: 0.75;
}
</style>
