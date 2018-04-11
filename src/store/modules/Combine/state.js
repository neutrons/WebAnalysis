import * as d3 from 'd3';
import scales from '../../scales/scales';

export default {
  selectedData: [],
  combinedData: [],
  filters: [],
  scale: {
    x: { ...scales.x },
    y: { ...scales.y },
  },
  plotScale: {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  },
  isNormalized: false,
  isFieldChange: false,
  storedCombined: {},
};
