import * as d3 from 'd3';
import settings from '../../fits/settings';
import fits from '../../fits/TAS';
import scales from '../../scales/scales';

export default {
  ID: 'TAS',
  fetched: {},
  uploaded: {},
  saved: {},
  filesSelected: [],
  filters: [],
  selectedData: [],
  filteredData: [],
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
    damping: settings.damping.value,
    errorTolerance: settings.errorTolerance.value,
    gradientDifference: settings.gradientDifference.value,
    maxIterations: settings.maxIterations.value,
  },
  fitEquation: undefined,
  fitInitialValues: [],
  fitType: ['Linear'],
  fitError: null,
  fitNote: '',
  label: {
    x: 'q = x',
    y: 'I(q) = y',
  },
  fit: { ...fits },
  field: {
    x: 'pt',
    y: 'detector',
  },
  deleteKeys: [],
  fittedData: [],
  previousFit: '',
  transformations: {
    x: 'x',
    y: 'y',
    error: 'error',
  },
  fits: { ...fits },
  selectionLimits: [],
  brushSelection: [],
  brushFile: undefined,
  isFitting: false,
};
