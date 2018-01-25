<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'ChartSANS1D',
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: 'tab-fit',
    };
  },
  created() {
    eventBus.$on('refit-data-SANS1D', this.drawChart);
    eventBus.$on('revise-fit-line', this.reviseFitLine);
  },
  computed: {
    ...mapState('SANS1D', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      colorDomain: state => state.colorDomain,
      deleteKeys: state => state.deleteKeys,
      label: state => state.transformations,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      fittedData: state => state.fittedData,
      filteredData: state => state.filteredData,
      fitEquation: state => state.fitEquation,
    }),
    ...mapGetters('SANS1D', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      preparedData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapMutations('SANS1D', [
      'resetBrushSelection',
      'resetSelectionLimits',
      'setPreviousFit',
    ]),
  },
};

</script>