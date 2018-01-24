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
      colorDomain: state => state.colorDomain,
      deleteKeys: state => state.deleteKeys,
      label: state => state.label,
      fileToFit: state => state.fileToFit,
      previousFit: state => state.previousFit,
      fittedData: state => state.fittedData,
      brushes: state => state.brushes,
      brushScale: state => state.brushScale,
      brushSelections: state => state.brushSelections,
      savedBrushes: state => state.savedBrushes,
      savedBrushSelections: state => state.savedBrushSelections,
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
      'addNewBrush',
      'setBrushes',
      'resetBrushes',
      'addBrushSelections',
      'setBrushSelections',
      'resetBrushSelections',
      'reconvertBrushSelections',
      'setBrushScale',
      'toggleZoomBrush',
      'setStitchedData',
      'resetStitchedData',
      'saveBrushes',
      'saveBrushSelections',
    ]),
  },
};

</script>