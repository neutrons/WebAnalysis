<template>
<v-container fluid pa-0 class='chart-wrapper'>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar flat dense color='blue' dark>
        <v-btn flat small @click='resetChart' :disabled='filesSelected.length === 0'>
          <span>Reset Chart</span>
          <v-icon right>fa-undo</v-icon>
        </v-btn>

        <v-export-chart-button :ID='ID' :disable='filesSelected.length === 0'></v-export-chart-button>
        <v-my-data-table v-if='fileToFit'></v-my-data-table>
        <v-legend-button @toggle-legend='drawerRight = !drawerRight' @close-legend='drawerRight = false' :disable='filesSelected.length === 0'></v-legend-button>
        <v-spacer></v-spacer>
        <v-toolbar-title class='text-xs-right' v-if='filesSelected.length > 0 && xPoint'>X: {{xPoint.toExponential(2)}} Y: {{yPoint.toExponential(2)}} Error: {{errorPoint.toExponential(2)}}</v-toolbar-title>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 :id='`chart-wrapper-${ID}`' text-xs-center>
      <svg :class='`chart chart-${ID}`'>
      </svg>
    </v-flex>

    <v-flex xs12 v-if='fileToFit'>
        <v-fit-results-table :x-scale='xScale'></v-fit-results-table>
    </v-flex>
  </v-layout>
  
  <v-legend :drawer-right='drawerRight'></v-legend>
</v-container>
</template>

<script>
// Import Packages
import { mapState, mapGetters, mapMutations } from 'vuex';
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

// Import Components
import DataTable from '../BaseComponents/DataTable';
import LegendButton from '../BaseComponents/Legend/LegendButton';
import Legend from '../BaseComponents/Legend/Legend';
import FitResultsTable from '../BaseComponents/FitResultsTable';
import ExportChartButtom from '../BaseComponents/ExportChartButton';

import { eventBus } from '../../assets/js/eventBus';

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
  ],
  props: {
    isMathJax: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'v-my-data-table': DataTable,
    'v-legend-button': LegendButton,
    'v-legend': Legend,
    'v-fit-results-table': FitResultsTable,
    'v-export-chart-button': ExportChartButtom,
  },
  data() {
    return {
      svg: undefined,
      g: undefined,
      drawerRight: false,
    };
  },
  computed: {
    ...mapState('SANS1D', {
      ID: state => state.ID,
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      width: state => state.width,
      height: state => state.height,
      viewBox: state => state.viewBox,
      colorDomain: state => state.colorDomain,
      deleteKeys: state => state.deleteKeys,
      label: state => state.label,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      defaultMargin: state => state.defaultMargin,
      sliderMargin: state => state.sliderMargin,
      fittedData: state => state.fittedData,
    }),
    ...mapGetters('SANS1D', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
    }),
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
  },
  mounted() {
    this.getContainerWidth();
    this.drawChart();
    this.setResponsive();

    eventBus.$on('refit-data', this.drawChart);
  },
  methods: {
    ...mapMutations('SANS1D', [
      'setWidth',
      'setHeight',
      'setViewBox',
      'resetBrushSelection',
      'resetBrushFile',
      'resetSelectionLimits',
      'setPreviousFit',
    ]),
  },
  watch: {
    chartConfigurations: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          console.log('chart configs changed...');
          if (this.filesSelected.length === 0 || this.fileToFit !== this.previousFit) {
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
  },
};

</script>

<style lang='scss'>
.chart-wrapper {
  height: calc(100vh - 100px); // make chart component always be 100 height minus footer and toolbar heights
}

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
