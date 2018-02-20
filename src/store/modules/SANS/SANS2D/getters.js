import _ from 'lodash';

import getURLs from '../../../shared/getters/getURLs';

export default {
  getSavedFile: state => (file) => {
    const temp = state.saved[file];

    if (temp === undefined) {
      return '999';
    }

    return { data: _.cloneDeep(temp), filename: file };
  },
  getURLs,
  isFilePlotted: state => state.filesSelected !== null,
  getPreparedData: (state) => {
    if (!state.selectedData.length) return [];

    const temp = state.selectedData.filter(el =>
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
  getChartConfigurations: (state, getters) => (
    { data: getters.getPreparedData,
      hexBinSize: state.hexBinSize }
  ),
};
