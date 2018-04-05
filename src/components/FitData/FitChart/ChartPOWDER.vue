<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'ChartPOWDER',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/POWDERFitEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  created() {
    eventBus.$on('redraw-chart-powder-fit', this.redrawChart);
  },
  destroyed() {
    eventBus.$off('redraw-chart-powder-fit');
  },
  computed: {
    ...mapState('POWDER/Fit', {
      filesSelected: state => state.filesSelected,
      plotScale: state => state.plotScale,
      label: state => state.field,
      fields: state => state.field,
    }),
    ...mapGetters('POWDER/Fit', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      isFileFit: 'isFileFit',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
    }),
  },
  methods: {
    ...mapActions('POWDER/Fit', [
      'deletePoint',
    ]),
  },
  watch: {
    filesSelected() {
      if (this.filesSelected.length) {
        this.activeParentTab = 'tab-metadata';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>