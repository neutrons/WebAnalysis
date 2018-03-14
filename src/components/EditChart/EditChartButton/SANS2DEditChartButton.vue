<script>
import { mapState } from 'vuex';

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
      selectedData: state => state.selectedData,
      filesSelected: state => state.filesSelected,
    }),
    name() {
      return this.filesSelected;
    },
    xData() {
      return this.selectedData.map(d => d.qx);
    },
    yData() {
      return this.selectedData.map(d => d.qy);
    },
    intensityData() {
      return this.selectedData.map(d => d.intensity);
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