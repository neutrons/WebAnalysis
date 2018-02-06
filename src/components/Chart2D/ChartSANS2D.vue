<script>
import { mapState, mapGetters } from 'vuex';
import Chart from './DefaultChart';

export default {
  name: 'ChartSANS2D',
  extends: Chart,
  data() {
    return {
      isMathJax: false,
    };
  },
  computed: {
    ...mapState('SANS/SANS2D', {
      filesSelected: state => state.filesSelected,
      label: state => state.label,
      hexBinSize: state => state.hexBinSize,
    }),
    ...mapGetters('SANS/SANS2D', {
      chartConfigurations: 'getChartConfigurations',
      preparedData: 'getPreparedData',
    }),
  },
};

</script>