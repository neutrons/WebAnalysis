import * as d3 from 'd3';

import transformDataFunc from '../../../../assets/js/transformData';
import setCurrentData from '../../../shared/mutations/setCurrentDataSANS1D';

import mutations from '../mutations';

mutations.setCurrentData = setCurrentData;

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

mutations.setXTransformation = (state, x) => {
  /* eslint-disable */
  state.transformations.x = x;
  state.label.x = `q = ${x}`;
  /* eslint-enable */
};

mutations.setYTransformation = (state, y) => {
  /* eslint-disable */
  state.transformations.y = y;
  state.label.y = `I(q) = ${y}`;
  /* eslint-enable */
};

mutations.transformData = (state) => {
  state.selectedData.forEach((el) => {
    if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
      // eslint-disable-next-line
      el.dataTransformed = transformDataFunc(el.data, state.transformations, state.field);
    } else {
      // eslint-disable-next-line
      el.dataTransformed = _.cloneDeep(el.data);
    }
  });
};

mutations.resetTransformations = (state) => {
  /* eslint-disable */
  state.transformations = {
    x: state.fits[state.fitType].transformations.x,
    y: state.fits[state.fitType].transformations.y,
    error: state.fits[state.fitType].transformations.error,
  };

  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  /* eslint-enable */
};

export default mutations;
