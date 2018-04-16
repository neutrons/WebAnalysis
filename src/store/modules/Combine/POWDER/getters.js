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

powderGetters.getPreparedData = (state, getters) => { // eslint-disable-line
  const xField = state.field.x;
  const yField = state.field.y;

  // First, exclude Anodes based on file and user selection
  // regex /^anode(?!19)(?!44)\d+$/
  // this means looks for a string that inclues "anode"
  // plus any proceeding digits excluding "19" and "44"
  // dynamic regex: `^anode${anodesToExclude.map(node => '(?!' + node + ')').join('')}\\d+$`;
  const anodesToExclude = [...state.anodesToExclude];
  const excludeStrings = anodesToExclude.map(anode => `(?!${anode})`).join('');
  const reg = new RegExp(`^anode${excludeStrings}\\d+$`);

  let temp = _.cloneDeep(state.selectedData);
  temp = temp.map(a => a.dataTransformed
    .filter(b => reg.exec(b.anode) !== null)
    .map(c => c.values));


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

powderGetters.getAnodeNames = (state) => {
  const nodes = state.selectedData
    .map(a => a.data.map(b => +b.anode.replace('anode', ''))) // get all anode names and reduce to numbers
    .reduce((a, b) => a.concat(b), []) // reduce to flat array
    .filter((a, index, arr) => arr.indexOf(a) === index); // filter out duplicate values

  return nodes;
};

export default powderGetters;
