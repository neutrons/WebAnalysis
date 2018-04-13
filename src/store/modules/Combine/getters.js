import _ from 'lodash';
import * as d3 from 'd3';

import getFields from '../../shared/getters/getFields';
import getExtent from '../../shared/getters/getExtent';
import getPlotData from '../../shared/getters/getPlotData';
import isFilesPlotted from '../../shared/getters/isFilesPlotted';

export default {
  getPlotData,
  isFilesPlotted,
  getFields,
  getExtent,
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
