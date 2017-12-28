import * as d3 from 'd3';
import scales from '../../Scales/scales';

export default {
  fetched: {},
  uploaded: {},
  saved: {},
  filesSelected: null,
  filters: [],
  selectedData: [],
  scale: {
    x: { ...scales.x },
  },
  plotScale: {
    x: d3.scaleLinear(),
    y: d3.scaleLinear(),
  },
  label: {
    x: 'x',
    y: 'y',
  },
};
