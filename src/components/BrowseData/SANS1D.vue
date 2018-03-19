<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DefaultChart from './DefaultChart';

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
  computed: {
    ...mapState('SANS/Browse', {
      browseData: state => state.browseData,
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