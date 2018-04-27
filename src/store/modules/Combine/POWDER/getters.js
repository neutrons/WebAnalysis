import * as d3 from 'd3';
import _ from 'lodash';

import createErrorPoints from '../../../../assets/js/createErrorPoints';

import getter from '../getters';
import getMetadata from '../../../shared/getters/getMetadata';

const powderGetters = _.cloneDeep(getter);

powderGetters.getMetadata = getMetadata;

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
  temp = createErrorPoints(temp, yField);

  // Sort by smallest x value
  temp = temp.sort((a, b) => a[xField] - b[xField]);

  // Nest the entries by name
  temp = d3.nest()
    .key(d => d.name)
    .entries(temp);

  return temp;
};

powderGetters.getAnodeNames = (state) => {
  const nodes = state.selectedData
    .map(a => a.data.map(b => +b.anode.replace('anode', ''))) // get all anode names and reduce to numbers
    .reduce((a, b) => a.concat(b), []) // reduce to flat array
    .filter((a, index, arr) => arr.indexOf(a) === index); // filter out duplicate values

  return nodes;
};

export default powderGetters;
