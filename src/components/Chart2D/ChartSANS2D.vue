<script>
import { mapState, mapGetters } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'ChartSANS2D',
  components: {
    'v-edit-chart-button': () => import('../EditChart/EditChartButton/SANS2DEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
    };
  },
  created() {
    eventBus.$on('redraw-chart-sans-2d', this.redrawChart);
  },
  destroyed() {
    eventBus.$off('redraw-chart-sans-2d');
  },
  computed: {
    ...mapState('SANS/SANS2D', {
      filesSelected: state => state.filesSelected,
      label: state => state.label,
      hexBinSize: state => state.hexBinSize,
      fileToPlot: state => state.filesSelected,
    }),
    ...mapGetters('SANS/SANS2D', {
      chartConfigurations: 'getChartConfigurations',
      preparedData: 'getPreparedData',
    }),
  },
};

</script>