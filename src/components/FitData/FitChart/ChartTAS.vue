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
  destroyed() {
    eventBus.$off('refit-data-TAS');
    eventBus.$off('revise-fit-line-TAS');
  },
  computed: {
    ...mapState('TAS', {
      colorDomain: state => state.colorDomain,
    }),
    ...mapState('TAS/Fit', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
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
    ...mapGetters('TAS/Fit', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'resetBrushSelection',
      'setPreviousFit',
      'updateFitTableResults',
      'toggleIsFitting',
    ]),
  },
};

</script>