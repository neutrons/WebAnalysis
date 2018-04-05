<script>
import { mapState, mapGetters } from 'vuex';

import EditChartButton from './EditChartButton';

export default {
  name: 'SANSStitchEditChartButton',
  extends: EditChartButton,
  computed: {
    ...mapState('SANS/Stitch', {
      label: state => state.label,
      plotScale: state => state.plotScale,
      fields: state => state.field,
    }),
    ...mapGetters('SANS/Stitch', [
      'getChartConfigurations',
    ]),
    axis() {
      return {
        x: this.plotScale.x.label === 'log(x)' ? 'log' : 'linear',
        y: this.plotScale.y.label === 'log(y)' ? 'log' : 'linear',
      };
    },
    editChartData() {
      return JSON.stringify({
        data: this.packageData(),
        labels: this.label,
        axis: this.axis,
        type: '1D',
      });
    },
  },
  methods: {
    packageData() {
      const temp = [];
      this.getChartConfigurations.data.forEach((curve) => {
        const errors = curve.values.map(d => d.error);

        temp.push({
          name: curve.key,
          x: curve.values.map(d => d[this.fields.x]),
          y: curve.values.map(d => d[this.fields.y]),
          error_y: {
            type: 'data',
            array: errors,
            visible: true,
          },
        });
      });
      return temp;
    },
  },
};
</script>