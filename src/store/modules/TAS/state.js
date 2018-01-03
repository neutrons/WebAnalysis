import * as d3 from 'd3';
import settings from '../../fits/settings';
import fits from '../../fits/TAS';
import scales from '../../Scales/scales';

export default {
  ID: 'TAS',
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
  defaultFitSettings: { ...settings },
  fitSettings: {
    damping: undefined,
    errorTolerance: undefined,
    gradientDifference: undefined,
    maxIterations: undefined,
  },
  fitEquation: undefined,
  fitInitialValues: [],
  label: {
    x: 'x',
    y: 'y',
  },
  fit: { ...fits },
  field: {
    x: 'pt',
    y: 'detector',
  },
};
