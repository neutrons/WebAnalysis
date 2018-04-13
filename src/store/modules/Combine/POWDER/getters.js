import * as d3 from 'd3';
import _ from 'lodash';

import getter from '../getters';

const powderGetters = _.cloneDeep(getter);

powderGetters.getMetadata = (state) => {
  if (!state.filesSelected.length) return null;

  const obj = {};
  state.selectedData.forEach((d) => {
    if (typeof d.metadata !== 'undefined' && d.metadata.length > 0) {
      obj[d.filename] = [...d.metadata];
    }
  });

  return obj;
};

powderGetters.getPreparedData = (state) => { // eslint-disable-line
  const xField = state.field.x;
  const yField = state.field.y;

  // Get all anodes for each curve
  let temp = state.selectedData.map(d => d.dataTransformed.map(z => z.values));

  // Exclude Anodes Based on File and User Selection
  // regex /^anode(?!19)(?!44)\d+$/
  // this means looks for a string that inclues "anode"
  // plus any proceeding digit exclude "19" and "44"
  // dynamic regex: `^anode${anodesToExclude.map(node => '(?!' + node + ')').join('')}\\d+$`;

  // Flatten into one array
  temp = _.flattenDeep(temp);

  // Remove erroneous data points
  temp = temp.filter(d => Number.isFinite(d[yField]) && Number.isFinite(d[xField]));

  // Generate error points if non-existent
  temp = temp.map((point) => {
    if (typeof point.error === 'undefined') {
      return {
        ...point,
        error: point[yField] < 0 ? 0 : Math.sqrt(point[yField]),
      };
    }
    return { ...point };
  });

  // Sort by smallest x value
  temp = temp.sort((a, b) => a[xField] - b[xField]);

  // Nest the entries by name
  temp = d3.nest()
    .key(d => d.name)
    .entries(temp);

  return temp;
};

powderGetters.getChartConfigurations = (state, getters) => {
  const tempCombined = d3.nest()
    .key(d => d.name)
    .entries(state.combinedData);

  const data = _.cloneDeep(getters.getPreparedData.concat(tempCombined));
  const scales = state.plotScale;

  return {
    data,
    scales,
  };
};

export default powderGetters;
