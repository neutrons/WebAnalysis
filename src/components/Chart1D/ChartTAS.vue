<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './Chart1D';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'ChartTAS',
  extends: Chart,
  created() {
    eventBus.$on('refit-data-TAS', this.drawChart);
  },
  components: {
    'v-fit-results-table': () => import('../FitResultsTable/FitResultsTableTAS'),
  },
  computed: {
    ...mapState('TAS', {
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
    ...mapGetters('TAS', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      metadata: 'getMetadata',
    }),
  },
  methods: {
    ...mapMutations('TAS', [
      'setWidth',
      'setHeight',
      'setViewBox',
      'resetBrushSelection',
      'resetBrushFile',
      'resetSelectionLimits',
      'setPreviousFit',
    ]),
  },
};

</script>