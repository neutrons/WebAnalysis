<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'ChartTAS',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/TASFitEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  created() {
    eventBus.$on('redraw-chart-tas-fit', this.redrawChart);
    eventBus.$on('revise-fit-line-tas', this.reviseFitLine);
  },
  destroyed() {
    eventBus.$off('redraw-chart-tas-fit');
    eventBus.$off('revise-fit-line-tas');
  },
  computed: {
    ...mapState('TAS/Fit', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      label: state => state.field,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      fitInitialValues: state => state.fitInitialValues,
      fitSettings: state => state.fitSettings,
      isFitting: state => state.isFitting,
      fields: state => state.field,
    }),
    ...mapGetters('TAS/Fit', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
      fitInitialValues: 'fitInitialValues',
      fitEquation: 'finalEquation',
    }),
  },
  methods: {
    ...mapMutations('TAS/Fit', [
      'toggleIsFitting',
    ]),
    ...mapActions('TAS/Fit', [
      'updateFitDataResults',
      'deletePoint',
      'resetBrushSelection',
      'setPreviousFit',
    ]),
  },
  watch: {
    filesSelected() {
      if (this.filesSelected.length) {
        this.activeParentTab = 'tab-metadata';
      } else {
        this.activeParentTab = null;
      }
    },
    fileToFit() {
      if (this.filesSelected.length) {
        this.activeParentTab = this.fileToFit === null ? 'tab-metadata' : 'tab-fit';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>