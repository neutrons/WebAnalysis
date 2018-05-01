<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DefaultChart from './DefaultChart';

import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'SANS1DBrowse',
  extends: DefaultChart,
  components: {
    'v-edit-chart-button': () => import('../EditChart/EditChartButton/SANSBrowseEditChartButton'),
  },
  data() {
    return {
      isMathJax: true,
      ID: 'SANS-Browse',
    };
  },
  created() {
    eventBus.$on('redraw-chart-sans-browse', this.redrawChart);
  },
  destroyed() {
    eventBus.$off('redraw-chart-sans-browse');
  },
  computed: {
    ...mapState('SANS/Browse', {
      sd: state => state.selectedData,
      fields: state => state.field,
    }),
    ...mapGetters('SANS/Browse', {
      label: 'label',
      plotData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapActions('SANS/Browse', [
      'deletePoint',
    ]),
  },
};
</script>