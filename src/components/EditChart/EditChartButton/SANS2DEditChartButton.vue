<script>
import { mapState, mapGetters } from 'vuex';

import EditChartButton from './EditChartButton';

export default {
  name: 'SANSBrowseEditChartButton',
  extends: EditChartButton,
  data: () => ({
    labels: {
      x: 'Qx',
      y: 'Qy',
    },
    axis: {
      x: 'linear',
      y: 'linear',
    },
  }),
  computed: {
    ...mapState('SANS/SANS2D', {
      hexBinSize: state => state.hexBinSize,
      filesSelected: state => state.filesSelected,
    }),
    ...mapGetters('SANS/SANS2D', {
      plotData: 'getPreparedData',
    }),
    name() {
      return this.filesSelected;
    },
    xData() {
      return this.plotData.map(d => d.qx);
    },
    yData() {
      return this.plotData.map(d => d.qy);
    },
    intensityData() {
      return this.plotData.map(d => d.intensity);
    },
    editChartData() {
      return JSON.stringify({
        name: this.name,
        x: this.xData,
        y: this.yData,
        z: this.intensityData,
        labels: this.labels,
        axis: this.axis,
        type: '2D',
        hexBinSize: this.hexBinSize,
      });
    },
  },
};
</script>