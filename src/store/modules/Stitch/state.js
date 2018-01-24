import * as d3 from 'd3';
import scales from '../../Scales/scales';

export default {
  ID: 'Stitch',
  fetched: {},
  uploaded: {},
  saved: {},
  filesSelected: [],
  stitchedData: [],
  browseData: [],
  deleteKeys: [],
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
  brushScale: d3.scaleLinear(),
  brushes: [],
  brushSelections: {},
  savedBrushes: [],
  savedBrushSelections: {},
  label: {
    x: 'q = x',
    y: 'I(q) = y',
  },
  isZoomBrush: true,
  field: {
    x: 'x',
    y: 'y',
  },
};
