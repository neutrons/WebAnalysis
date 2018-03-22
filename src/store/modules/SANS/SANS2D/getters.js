import getURLs from '../../../shared/getters/getURLs';
import getStoredData from '../../../shared/getters/getStoredData';

export default {
  getStoredData,
  getURLs,
  isFilePlotted: state => state.filesSelected !== null,
  getPreparedData: (state) => {
    if (!state.selectedData.length) return [];

    let temp = state.selectedData[0].data;
    temp = temp.filter(el =>
      Number.isFinite(el.qx) &&
      Number.isFinite(el.qy) &&
      Number.isFinite(el.intensity) &&
      Number.isFinite(el.error))
      .map(d => ({ qx: d.qx, qy: d.qy, intensity: d.intensity, error: d.error }));

    if (state.hexScale === 'Log') {
      return temp.filter(el => el.intensity > 0)
        .map(d => ({ qx: d.qx, qy: d.qy, intensity: Math.log(d.intensity), error: d.error }));
    }

    return temp;
  },
  getChartConfigurations: (state, getters) => ({
    data: getters.getPreparedData,
    hexBinSize: state.hexBinSize,
  }),
};
