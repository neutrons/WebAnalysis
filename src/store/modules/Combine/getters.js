import _ from 'lodash';
import * as d3 from 'd3';

import getPreparedData from '../../shared/getters/getPreparedData';
import getPlotData from '../../shared/getters/getPlotData';
import isFilesPlotted from '../../shared/getters/isFilesPlotted';

export default {
  getPreparedData,
  getPlotData,
  isFilesPlotted,
  getMetadata(state, getters) {
    if (!getters.mergedFiles.length) return null;

    const obj = {};
    state.selectedData.forEach((d) => {
      if (typeof d.metadata !== 'undefined' && d.metadata.length > 0) {
        obj[d.filename] = [...d.metadata];
      }
    });

    return obj;
  },
  getChartConfigurations(state, getters) {
    const tempCombined = d3.nest()
      .key(d => d.name)
      .entries(state.combinedData);

    const data = _.cloneDeep(getters.getPreparedData.concat(tempCombined));
    const scales = state.plotScale;

    return {
      data,
      scales,
    };
  },
};
