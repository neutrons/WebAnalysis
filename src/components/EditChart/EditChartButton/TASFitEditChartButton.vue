<script>
import { mapState, mapGetters } from 'vuex';

import EditChartButton from './EditChartButton';

export default {
  name: 'TASFitEditChartButton',
  extends: EditChartButton,
  computed: {
    ...mapState('TAS/Fit', {
      fittedData: state => state.fittedData,
      fields: state => state.field,
      plotScale: state => state.plotScale,
    }),
    ...mapGetters('TAS/Fit', [
      'getPreparedData',
    ]),
    label() {
      return this.fields;
    },
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
      const temp = [{
        name: 'fit',
        x: this.fittedData.map(d => d[this.fields.x]),
        y: this.fittedData.map(d => d[this.fields.y]),
      }];

      this.getPreparedData.forEach((curve) => {
        temp.push({
          name: curve.key,
          x: curve.values.map(d => d[this.fields.x]),
          y: curve.values.map(d => d[this.fields.y]),
          error_y: curve.values.map(d => d.error)
            .map(d => ({
              type: 'data',
              array: d,
              visible: true,
            })),
        });
      });
      return temp;
    },
  },
};
</script>