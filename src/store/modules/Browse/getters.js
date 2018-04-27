import * as d3 from 'd3';
import _ from 'lodash';
import createErrorPoints from '../../../assets/js/createErrorPoints';

export default {
  label(state) {
    return {
      x: state.field.x,
      y: state.field.y,
    };
  },
  getPreparedData(state) {
    // this returns the data used for plotting
    if (!Object.keys(state.browseData).length) return [];

    const yField = state.field.y;
    let temp = _.cloneDeep(state.browseData.data);
    temp = createErrorPoints(temp, yField);

    const nest = d3.nest()
      .key(d => d.name)
      .entries(temp);

    return nest;
  },
};
