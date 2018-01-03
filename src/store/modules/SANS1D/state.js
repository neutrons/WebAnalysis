import * as d3 from 'd3';
import settings from '../../fits/settings';
import fits from '../../fits/SANS1D';
import scales from '../../Scales/scales';

export default {
  ID: 'SANS1D',
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
  fitType: 'Linear',
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
  transformations: {
    x: 'x',
    y: 'y',
    error: 'error',
  },
  fits: { ...fits },
  field: {
    x: 'x',
    y: 'y',
  },
};
