<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Chart from './DefaultChart';
import brush from './stitchBrush';
import stitchLine from './stitchLine';

export default {
  name: 'ChartStitch',
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: 'tab-fit',
    };
  },
  mixins: [
    brush,
    stitchLine,
  ],
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
      brushes: state => state.brushes,
      brushScale: state => state.brushScale,
      brushSelections: state => state.brushSelections,
      savedBrushes: state => state.savedBrushes,
      savedSelections: state => state.savedSelections,
      isZoomBrush: state => state.isZoomBrush,
      stitchedData: state => state.stitchedData,
    }),
    ...mapGetters('Stitch', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      preparedData: 'getPreparedData',
    }),
    brushCount() {
      if (!this.filesSelected.length) return null;

      return this.filesSelected.length - 1;
    },
  },
  methods: {
    ...mapMutations('Stitch', [
      'setWidth',
      'setHeight',
      'setViewBox',
      'addNewBrush',
      'resetBrushes',
      'setBrushSelections',
      'resetBrushSelections',
      'reconvertBrushSelections',
      'setBrushScale',
      'toggleZoomBrush',
      'setStitchedData',
      'resetStitchedData',
    ]),
  },
};

</script>