<script>
import { mapState } from 'vuex';
import DefaultChart from './DefaultChart';
import swapFields from '../../assets/js/swapFields';

export default {
  name: 'TASBrowse',
  extends: DefaultChart,
  data() {
    return {
      isMathJax: false,
      label: {
        x: 'x',
        y: 'y',
      },
      ID: 'TAS-Browse',
    };
  },
  computed: {
    ...mapState('TAS/Browse', {
      browseData: state => state.browseData,
    }),
    plotData() {
      if (!Object.keys(this.browseData).length) return [];
      return swapFields(this.browseData.data, this.extractDefaults(this.browseData.metadata));
    },
    plotMetadata() {
      if (!Object.keys(this.browseData).length) return {};

      return this.browseData.metadata;
    },
  },
  methods: {
    extractDefaults(md) {
      const obj = { x: 'x', y: 'y' };
      obj.x = md.def_x;
      obj.y = md.def_y;

      this.label = { ...obj };
      return obj;
    },
  },
};
</script>