import * as d3 from 'd3';
import _ from 'lodash';

export default {
  label(state) {
    return {
      x: state.field.x,
      y: state.field.y,
    };
  },
  getPreparedData(state) {
    if (!Object.keys(state.browseData).length) return [];
    const yField = state.field.y;
    const temp = _.cloneDeep(state.browseData.data)
      .map((point) => {
        if (typeof point.error === 'undefined') {
          return {
            ...point,
            error: point[yField] < 0 ? 0 : Math.sqrt(point[yField]),
          };
        }
        return { ...point };
      });

    const nest = d3.nest()
      .key(d => d.name)
      .entries(temp);

    return nest;
  },
};
