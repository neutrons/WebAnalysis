<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../assets/js/eventBus';

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
  },
  computed: {
    ...mapState('TAS', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
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
      preparedData: 'getPreparedData',
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