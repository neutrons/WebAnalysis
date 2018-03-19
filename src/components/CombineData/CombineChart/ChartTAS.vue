<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Chart from './DefaultChart';

export default {
  name: 'CombineChartTAS',
  components: {
    'v-edit-chart-button': () => import('../../EditChart/EditChartButton/TASCombineEditChartButton'),
  },
  extends: Chart,
  data() {
    return {
      isMathJax: false,
      activeParentTab: null,
    };
  },
  computed: {
    ...mapState('TAS/Combine', {
      plotScale: state => state.plotScale,
      label: state => state.field,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      fields: state => state.field,
      combinedData: state => state.combinedData,
    }),
    ...mapGetters('TAS/Combine', {
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
    ...mapActions('TAS/Combine', [
      'deletePoint',
    ]),
  },
  watch: {
    combinedData: {
      deep: true,
      handler(val) {
        if (!val.length) this.g.select('.group-combine').remove();
      },
    },
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