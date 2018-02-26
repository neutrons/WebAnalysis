<script>
import { mapState, mapGetters } from 'vuex';
import Chart from './DefaultChart';

export default {
  name: 'CombineChartTAS',
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
      deleteKeys: state => state.deleteKeys,
      label: state => state.field,
      fittedData: state => state.fittedData,
      fitEquation: state => state.fitEquation,
      filteredData: state => state.filteredData,
      field: state => state.field,
    }),
    ...mapGetters('TAS/Combine', {
      chartConfigurations: 'getChartConfigurations',
      getExtent: 'getExtent',
      metadata: 'getMetadata',
      preparedData: 'getPreparedData',
      mergedFiles: 'mergedFiles',
    }),
    plottedData() {
      const temp = this.preparedData.map(d => d.values)
        .reduce((a, b) => a.concat(b), [])
        .map((d) => {
          const obj = Object.assign({}, d);

          obj[this.field.x] = obj.x;
          obj[this.field.y] = obj.y;

          delete obj.x;
          delete obj.y;

          return obj;
        });

      return temp;
    },
  },
  watch: {
    mergedFiles() {
      if (this.mergedFiles.length) {
        this.activeParentTab = 'tab-metadata';
      } else {
        this.activeParentTab = null;
      }
    },
  },
};

</script>