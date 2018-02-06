<script>
import { mapState } from 'vuex';
import DefaultChart from './DefaultChart';

export default {
  name: 'SANS1DBrowse',
  extends: DefaultChart,
  data() {
    return {
      isMathJax: true,
      label: {
        x: 'q = x',
        y: 'I(q) = y',
      },
      ID: 'SANS-Browse',
    };
  },
  computed: {
    ...mapState('SANS/Browse', {
      browseData: state => state.browseData,
    }),
    plotData() {
      if (!Object.keys(this.browseData).length) return [];
      return this.browseData.data;
    },
  },
};
</script>