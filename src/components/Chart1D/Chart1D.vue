<template>
<v-container fluid pa-0 class='chart-wrapper'>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar flat dense color='blue' dark>
        <v-reset-chart-button @reset-chart='resetChart' :disable='filesSelected.length === 0'></v-reset-chart-button>
        <v-export-chart-button :ID='ID' :disable='filesSelected.length === 0'></v-export-chart-button>
        <v-fitted-data-table v-if='fileToFit' :fitted-data='fittedData' :file-to-fit='fileToFit'></v-fitted-data-table>
        <v-legend-button @toggle-legend='drawerRight = !drawerRight' @close-legend='drawerRight = false' :disable='filesSelected.length === 0'></v-legend-button>
        <v-spacer></v-spacer>
        <v-toolbar-title class='text-xs-right hidden-xs-only' v-if='filesSelected.length > 0 && xPoint'>X: {{xPoint.toExponential(2)}} Y: {{yPoint.toExponential(2)}} Error: {{errorPoint.toExponential(2)}}</v-toolbar-title>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 :id='`chart-wrapper-${ID}`' text-xs-center>
      <svg :class='`chart chart-${ID}`'>
      </svg>
    </v-flex>

    <v-flex xs12 v-if='fileToFit'>
      <v-fit-results-table :x-scale='xScale'></v-fit-results-table>
    </v-flex>

    <v-flex xs12 v-if='isMetadata'>
      <v-metadata-table :metadata='metadata' v-if='metadata !== null'></v-metadata-table>
    </v-flex>
  </v-layout>
  
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
    ID: {
      type: String,
      required: true,
    },
    isMathJax: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    'v-legend-button': () => import('../Legend/LegendButton'),
    'v-legend': () => import('../Legend/Legend'),
    'v-export-chart-button': () => import('../ExportChartButton'),
    'v-reset-chart-button': () => import('../ResetChartButton'),
    'v-metadata-table': () => import('../MetadataTable'),
    'v-fitted-data-table': () => import('../FittedDataTable'),
  },
  data() {
    return {
      svg: undefined,
      g: undefined,
      drawerRight: false,
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
