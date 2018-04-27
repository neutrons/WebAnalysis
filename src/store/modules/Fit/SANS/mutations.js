import * as d3 from 'd3';

import {
  setXTransformation,
  setYTransformation,
  transformData,
  resetTransformations,
} from '../../../shared/mutations/transformations';
import setCurrentData from '../../../shared/mutations/setCurrentDataSANS1D';

import mutations from '../mutations';

mutations.setCurrentData = setCurrentData;
mutations.setXTransformation = setXTransformation;
mutations.setYTransformation = setYTransformation;
mutations.transformData = transformData;
mutations.resetTransformations = resetTransformations;

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.filters = [];
  state.filesSelected = [];
  state.selectedData = [];
  state.fileToFit = null;
  state.previousFit = '';
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.transformations = {
    x: 'x',
    y: 'y',
  };
  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  state.fittedData = [];
  state.filteredData = [];
  state.brushSelection = [];
  state.equationEditSelect = [];
  state.fitError = null;
  state.fitScores = null;
  /* eslint-enable */
};

mutations.setFitType = (state, type = 'Linear') => {
  /* eslint-disable */
  state.fitType = type;
  state.transformations.x = state.fits[type].transformations.x;
  state.label.x = `q = ${state.transformations.x}`;
  state.transformations.y = state.fits[type].transformations.y;
  state.label.y = `I(q) = ${state.transformations.y}`;
  state.transformations.error = state.fits[type].transformations.error;
  state.fitNote = state.fits[type].note;
  /* eslint-enable */
};

mutations.resetFitConfiguration = (state) => {
  /* eslint-disable */
  state.fitType = 'Linear';
  state.transformations = {
    x: 'x',
    y: 'y',
    error: 'error',
  };
  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  state.fitError = null;
  state.fitNote = '';
  state.fitScores = null;
  /* eslint-enable */
};

export default mutations;
