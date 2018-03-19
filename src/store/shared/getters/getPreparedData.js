import * as d3 from 'd3';
import _ from 'lodash';

export default (state) => {
  const xField = state.field.x;
  const yField = state.field.y;

  let temp = state.selectedData.map(el => _.cloneDeep(el.dataTransformed));

  temp = _.flatten(temp);
  temp = temp.filter(d => Number.isFinite(d[yField]) && Number.isFinite(d[xField]));

  // Nest the entries by name
  temp = d3.nest()
    .key(d => d.name)
    .entries(temp);

  return temp;
};
