import * as d3 from 'd3';
import setCurrentData from '../../../shared/mutations/setCurrentDataSANS1D';
import { setXTransformation, setYTransformation, setTransformations, resetTransformations, transformData } from '../../../shared/mutations/transformations';

import mutations from '../mutations';

mutations.setXTransformation = setXTransformation;
mutations.setYTransformation = setYTransformation;
mutations.setTransformations = setTransformations;
mutations.resetTransformations = resetTransformations;
mutations.transformData = transformData;
mutations.setCurrentData = setCurrentData;

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.selectedData = [];
  state.fileToFit = null;
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

export default mutations;
