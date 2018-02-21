<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'ChartSANS1D',
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  created() {
    eventBus.$on('refit-data-SANS1D', this.drawChart);
    eventBus.$on('revise-fit-line-SANS1D', this.reviseFitLine);
  },
  destroyed() {
    eventBus.$off('refit-data-SANS1D');
    eventBus.$off('revise-fit-line-SANS1D');
  },
  computed: {
    ...mapState('SANS', {
      colorDomain: state => state.colorDomain,
    }),
    ...mapState('SANS/Fit', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      deleteKeys: state => state.deleteKeys,
      label: state => state.label,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      fittedData: state => state.fittedData,
      filteredData: state => state.filteredData,
      fitEquation: state => state.fitEquation,
      fitInitialValues: state => state.fitInitialValues,
      fitSettings: state => state.fitSettings,
      isFitting: state => state.isFitting,
    }),
    ...mapGetters('SANS/Fit', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      preparedData: 'getPreparedData',
    }),
    plottedData() {
      return this.preparedData.map(d => d.values).reduce((a, b) => a.concat(b), []);
    },
  },
  methods: {
    ...mapMutations('SANS/Fit', [
      'resetBrushSelection',
      'setPreviousFit',
      'updateFitTableResults',
      'toggleIsFitting',
    ]),
  },
  watch: {
    fileToFit() {
      if (this.filesSelected.length) {
        this.activeParentTab = this.fileToFit === null ? null : 'tab-fit';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>