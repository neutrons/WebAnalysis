<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'ChartTAS',
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: 'tab-metadata',
    };
  },
  created() {
    eventBus.$on('refit-data-TAS', this.drawChart);
    eventBus.$on('revise-fit-line-TAS', this.reviseFitLine);
  },
  computed: {
    ...mapState('TAS', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      colorDomain: state => state.colorDomain,
      deleteKeys: state => state.deleteKeys,
      label: state => state.field,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      fitInitialValues: state => state.fitInitialValues,
      fitSettings: state => state.fitSettings,
      isFitting: state => state.isFitting,
    }),
    ...mapGetters('TAS', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapMutations('TAS', [
      'resetBrushSelection',
      'setPreviousFit',
      'updateFitTableResults',
      'toggleIsFitting',
    ]),
  },
};

</script>