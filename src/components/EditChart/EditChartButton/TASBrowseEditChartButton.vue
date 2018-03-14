<script>
import { mapGetters } from 'vuex';

import EditChartButton from './EditChartButton';

export default {
  name: 'TASBrowseEditChartButton',
  extends: EditChartButton,
  data: () => ({
    axis: {
      x: 'linear',
      y: 'linear',
    },
  }),
  computed: {
    ...mapGetters('TAS/Browse', [
      'defaultFields',
      'label',
      'getPreparedData',
    ]),
    name() {
      return this.getPreparedData[0].key;
    },
    xData() {
      return this.getPreparedData[0].values.map(d => d.x);
    },
    yData() {
      return this.getPreparedData[0].values.map(d => d.y);
    },
    errorData() {
      const temp = this.getPreparedData[0].values.map(d => d.error);
      return {
        type: 'data',
        array: temp,
        visible: true,
      };
    },
    data() {
      return [{
        name: this.name,
        x: this.xData,
        y: this.yData,
        error_y: this.errorData,
      }];
    },
    editChartData() {
      return JSON.stringify({
        data: this.data,
        labels: this.label,
        axis: this.axis,
        type: '1D',
      });
    },
  },
};
</script>