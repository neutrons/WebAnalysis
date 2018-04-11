<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'CombineChartPOWDER',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/POWDERCombineEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  created() {
    eventBus.$on('redraw-chart-powder-combine', this.redrawChart);
  },
  destroyed() {
    eventBus.$off('redraw-chart-powder-combine');
  },
  computed: {
    ...mapState('POWDER/Combine', {
      plotScale: state => state.plotScale,
      label: state => state.field,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      fields: state => state.field,
      combinedData: state => state.combinedData,
    }),
    ...mapGetters('POWDER/Combine', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
      mergedFiles: 'mergedFiles',
    }),
    plottedData() {
      return this.preparedData.map(d => d.values).reduce((a, b) => a.concat(b), []);
    },
  },
  methods: {
    ...mapActions('POWDER/Combine', [
      'deletePoint',
    ]),
  },
  watch: {
    mergedFiles() {
      if (this.mergedFiles.length) {
        this.activeParentTab = this.combinedData.length ? 'tab-combined' : 'tab-metadata';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>