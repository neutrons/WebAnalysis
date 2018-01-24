<script>
import { mapState } from 'vuex';
import QuickPlot from './QuickPlot';
import swapFields from '../../assets/js/swapFields';

export default {
  name: 'TASBrowse',
  extends: QuickPlot,
  data() {
    return {
      isMathJax: false,
      label: {
        x: 'q = x',
        y: 'I(q) = y',
      },
    };
  },
  computed: {
    ...mapState('TAS', {
      ID: state => state.ID,
      browseData: state => state.browseData,
    }),
    plotData() {
      if (!Object.keys(this.browseData).length) return [];
      return swapFields(this.browseData.data, this.extractDefaults(this.browseData.metadata));
    },
    plotMetadata() {
      if (!Object.keys(this.browseData).length) return [];

      return this.browseData.metadata;
    },
  },
  methods: {
    extractDefaults(md) {
      const obj = { x: 'x', y: 'y' };

      md.forEach((el) => {
        const xMatch = /^def_x/.exec(el);
        const yMatch = /^def_y/.exec(el);

        if (xMatch !== null) {
          obj.x = el.trim().split(' = ')[1];
        } else if (yMatch !== null) {
          obj.y = el.trim().split(' = ')[1];
        }
      });

      this.label = { ...obj };
      return obj;
    },
  },
};
</script>