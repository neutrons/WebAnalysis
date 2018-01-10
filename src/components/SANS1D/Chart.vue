<template>
<v-container fluid pa-0>
  <v-layout row wrap>
    <v-flex xs12>
      <v-toolbar flat dense color='blue' dark>
        <v-reset-chart @reset-chart='resetChart'></v-reset-chart>
        <v-my-data-table></v-my-data-table>
        <v-legend-button @toggle-legend='drawerRight = !drawerRight' @close-legend='drawerRight = false'></v-legend-button>
        <v-spacer></v-spacer>
        <v-toolbar-title v-if='filesSelected.length > 0 && xPoint'>X: {{xPoint.toExponential(2)}}</v-toolbar-title>
        <v-toolbar-title v-if='filesSelected.length > 0 && yPoint'>Y: {{yPoint.toExponential(2)}}</v-toolbar-title>
        <v-toolbar-title v-if='filesSelected.length > 0 && errorPoint'>Error: {{errorPoint.toExponential(2)}}</v-toolbar-title>
      </v-toolbar>
    </v-flex>

    <v-flex xs12 :id='`chart-${ID}`' text-xs-center>
      <svg :class='`chart chart-${ID}`'>
      </svg>
    </v-flex>

    <v-flex xs12>
        <v-fit-results-table :x-scale='xScale'></v-fit-results-table>
    </v-flex>
  </v-layout>
  
  <v-legend :drawer-right='drawerRight'></v-legend>
</v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

import * as d3 from 'd3';
import setResponsive from '../../assets/js/chartFunctions/setResponsive';
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
import getContainerWidth from './getContainerWidth';
import ResetChartButton from '../BaseComponents/ResetChartButton';
import DataTable from '../BaseComponents/DataTable';
import LegendButton from '../BaseComponents/LegendButton';
import Legend from '../BaseComponents/Legend';
import FitResultsTable from '../BaseComponents/FitResultsTable';
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
  components: {
    'v-reset-chart': ResetChartButton,
    'v-my-data-table': DataTable,
    'v-legend-button': LegendButton,
    'v-legend': Legend,
    'v-fit-results-table': FitResultsTable,
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
      let temp = {};
      if (this.fileToFit !== null) {
        console.log('send slider margins');
        temp = this.sliderMargin;
      } else {
        console.log('send default margin');
        temp = this.defaultMargin;
      }

      return temp;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.chart-bg {
  fill: white;
  opacity: 1;
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

iframe.width-changed-SANS1D {
  width: 100%;
  display: block;
  border: 0;
  height: 0;
  margin: 0;
}

.chart-SANS1D {
  // Extra small screen (mobile)
  @media screen and (max-width: 599px) {
    max-height: 500px / 1.77px;
    max-width: 500px;
  }

  // Small screen (tablet)
  @media screen and (min-width: 600px) and (max-width: 959px) {
    max-height: 800px / 1.77px;
    max-width: 800px;
  }

  // Medium screen (laptop)
  @media screen and (min-width: 960px) and (max-width: 1263px) {
    max-height: 1000px / 1.77px;
    max-width: 1000px;
  }

  // Large screen (desktop)
  @media screen and (min-width: 1264px) and (max-width: 1903px) {
    max-height: 1500px / 1.77px;
    max-width: 1500px;
  }

  // Extra large screen (ultrawide)
  @media screen and (min-width: 1904px){
    max-height: 1800px / 1.77px;
    max-width: 1800px;
  }
}

.zoom {
  cursor: move;
  opacity: 0;
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
  fill: 'brown';
  transform-origin: center;
  transform: scale(3);
}

.handle {
  fill: gray;
  opacity: 0.75;
}
</style>
