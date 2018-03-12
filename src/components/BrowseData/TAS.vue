<script>
import { mapState } from 'vuex';
import * as d3 from 'd3';
import DefaultChart from './DefaultChart';
import swapFields from '../../assets/js/swapFields';

export default {
  name: 'TASBrowse',
  extends: DefaultChart,
  data() {
    return {
      isMathJax: false,
      ID: 'TAS-Browse',
    };
  },
  computed: {
    ...mapState('TAS/Browse', {
      browseData: state => state.browseData,
    }),
    defaultFields() {
      if (typeof this.browseData.defaultFields === 'undefined') {
        return { x: 'x', y: 'y' };
      }
      return this.browseData.defaultFields;
    },
    label() {
      return {
        x: this.defaultFields.x,
        y: this.defaultFields.y,
      };
    },
    plotData() {
      if (!Object.keys(this.browseData).length) return [];
      const temp = swapFields(this.browseData.data, this.defaultFields);
      const nest = d3.nest()
        .key(d => d.name)
        .entries(temp);

      return nest;
    },
    plotMetadata() {
      if (!Object.keys(this.browseData).length) return [];

      return this.browseData.metadata;
    },
  },
};
</script>