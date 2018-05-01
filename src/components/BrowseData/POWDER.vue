<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DefaultChart from './DefaultChart';

import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'POWDERBrowse',
  extends: DefaultChart,
  components: {
    'v-edit-chart-button': () => import('../EditChart/EditChartButton/POWDERBrowseEditChartButton'),
  },
  data() {
    return {
      isMathJax: false,
      ID: 'POWDER-Browse',
    };
  },
  created() {
    eventBus.$on('redraw-chart-powder-browse', this.redrawChart);
  },
  destroyed() {
    eventBus.$off('redraw-chart-powder-browse');
  },
  computed: {
    ...mapState('POWDER/Browse', {
      sd: state => state.selectedData,
      fields: state => state.field,
    }),
    ...mapGetters('POWDER/Browse', {
      label: 'label',
      plotData: 'getPreparedData',
      metadata: 'plotMetadata',
    }),
  },
  methods: {
    ...mapActions('POWDER/Browse', [
      'deletePoint',
    ]),
  },
};
</script>