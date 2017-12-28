import * as d3 from 'd3';
import settings from '../../fits/settings';
import fits from '../../fits/SANS1D';
import scales from '../../Scales/scales';

export default {
  fetched: {},
  uploaded: {},
  saved: {},
  filesSelected: [],
  filters: [],
  selectedData: [],
  fileToFit: null,
  colorDomain: [],
  scale: {
    x: { ...scales.x },
    y: { ...scales.y },
  },
  plotScale: {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  },
  fitSetting: { ...settings },
  fitEquation: null,
  initialValues: [],
  label: {
    x: 'x',
    y: 'y',
  },
  transformations: {
    x: 'x',
    y: 'y',
  },
  fit: { ...fits },
  field: {
    x: 'x',
    y: 'y',
  },
};
