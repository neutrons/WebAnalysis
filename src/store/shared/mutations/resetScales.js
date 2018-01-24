import * as d3 from 'd3';

export default (state) => {
  // eslint-disable-next-line
  state.plotScale = {
    x: {
      label: 'x',
      value: d3.scaleLinear(),
    },
    y: {
      label: 'y',
      value: d3.scaleLinear(),
    },
  };
};
