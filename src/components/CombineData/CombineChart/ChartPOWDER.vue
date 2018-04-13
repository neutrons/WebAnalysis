<script>
import { mapState, mapGetters, mapActions } from 'vuex';

import Chart from './DefaultChart';
import { eventBus } from '../../../assets/js/eventBus';
import chartMethods from './chartMethods';

export default {
  name: 'CombineChartPOWDER',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/POWDERCombineEditChartButton'),
  },
  mixins: [
    chartMethods,
  ],
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
      combinedData: state => state.combinedData,
      mergedFiles: state => state.filesSelected,
      fields: state => state.field,
    }),
    ...mapGetters('POWDER/Combine', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
    }),
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