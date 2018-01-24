<script>
import { mapState } from 'vuex';
import QuickPlot from './QuickPlot';

export default {
  name: 'SANS1DBrowse',
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
    ...mapState('SANS1D', {
      ID: state => state.ID,
      browseData: state => state.browseData,
    }),
    plotData() {
      return this.browseData;
    },
  },
};
</script>