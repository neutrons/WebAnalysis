import getPreparedData from '../../shared/getters/getPreparedData';
import getExtent from '../../shared/getters/getExtent';
import getPlotData from '../../shared/getters/getPlotData';
import isFilesPlotted from '../../shared/getters/isFilesPlotted';

export default {
  getPreparedData,
  isFilesPlotted,
  getExtent,
  getPlotData,
  getChartConfigurations: (state, getters) => {
    const data = getters.getPreparedData;
    const scales = state.plotScale;
    const labels = state.label;

    return {
      data,
      scales,
      labels,
    };
  },
};

