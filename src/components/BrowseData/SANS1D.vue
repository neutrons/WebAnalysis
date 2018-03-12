<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';
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
      const nest = d3.nest()
        .key(d => d.name)
        .entries(this.browseData.data);

      return nest;
    },
  },
};
</script>