<script>
import { mapState } from 'vuex';
import QuickPlot from './QuickPlot';

export default {
  name: 'StitchBrowse',
  extends: QuickPlot,
  data() {
    return {
      isMathJax: true,
      label: {
        x: 'q = x',
        y: 'I(q) = y',
      },
    };
  },
  computed: {
    ...mapState('Stitch', {
      ID: state => state.ID,
      browseData: state => state.browseData,
    }),
    plotData() {
      return this.browseData;
    },
  },
};
</script>