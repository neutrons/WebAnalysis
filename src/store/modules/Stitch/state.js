import * as d3 from 'd3';
import scales from '../../Scales/scales';

export default {
  ID: 'Stitch',
  fetched: {},
  uploaded: {},
  saved: {},
  filesSelected: [],
  filters: [],
  selectedData: [],
  colorDomain: [],
  scale: {
    x: { ...scales.x },
    y: { ...scales.y },
  },
  plotScale: {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  },
  label: {
    x: 'x',
    y: 'y',
  },
  isZoomBrush: true,
};
