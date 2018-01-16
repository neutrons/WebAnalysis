<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './Chart';

export default {
  name: 'ChartStitch',
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: 'tab-fit',
    };
  },
  computed: {
    ...mapState('Stitch', {
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
    ...mapGetters('Stitch', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      preparedData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapMutations('Stitch', [
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