import * as d3 from 'd3';
import _ from 'lodash';

export default (state) => {
  let temp = state.selectedData.map(el => _.cloneDeep(el.dataTransformed));

  temp = _.flatten(temp);
  temp = temp.filter(d => Number.isFinite(d.y) && Number.isFinite(d.x));

  // Nest the entries by name
  temp = d3.nest()
    .key(d => d.name)
    .entries(temp);

  return temp;
};
