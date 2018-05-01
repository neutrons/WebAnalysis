<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DefaultChart from './DefaultChart';

import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'TASBrowse',
  extends: DefaultChart,
  components: {
    'v-edit-chart-button': () => import('../EditChart/EditChartButton/TASBrowseEditChartButton'),
  },
  data() {
    return {
      isMathJax: false,
      ID: 'TAS-Browse',
    };
  },
  created() {
    eventBus.$on('redraw-chart-tas-browse', this.redrawChart);
  },
  destroyed() {
    eventBus.$off('redraw-chart-tas-browse');
  },
  computed: {
    ...mapState('TAS/Browse', {
      sd: state => state.selectedData,
      fields: state => state.field,
    }),
    ...mapGetters('TAS/Browse', {
      label: 'label',
      plotData: 'getPreparedData',
      plotMetadata: 'plotMetadata',
    }),
  },
  methods: {
    ...mapActions('TAS/Browse', [
      'deletePoint',
    ]),
  },
};
</script>