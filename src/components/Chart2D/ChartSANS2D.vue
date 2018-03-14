<script>
import { mapState, mapGetters } from 'vuex';
import Chart from './DefaultChart';

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