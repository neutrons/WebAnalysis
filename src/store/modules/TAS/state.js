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
    damping: settings.damping.value,
    errorTolerance: settings.errorTolerance.value,
    gradientDifference: settings.gradientDifference.value,
    maxIterations: settings.maxIterations.value,
  },
  fitEquation: undefined,
  fitInitialValues: [],
  fitType: 'Linear',
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
  width: 960,
  height: 600,
  viewBox: '0 0 960 600',
  defaultMargin: {
    top: 20,
    right: 50,
    bottom: 50,
    left: 100,
  },
  sliderMargin: {
    top: 50,
    right: 50,
    bottom: 130,
    left: 100,
  },
  sliderHeight: 25,
  selectionLimits: [],
  brushSelection: [],
  brushLimits: [],
  brushFile: undefined,
};
