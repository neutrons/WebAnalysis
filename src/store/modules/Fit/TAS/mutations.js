import * as d3 from 'd3';
import setCurrentData from '../../../shared/mutations/setCurrentDataTAS';
import { setYField, setXField } from '../../../shared/mutations/fields';

import mutations from '../mutations';

mutations.setCurrentData = setCurrentData;
mutations.setYField = setYField;
mutations.setXField = setXField;

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.filters = [];
  state.filesSelected = [];
  state.selectedData = [];
  state.fittedData = [];
  state.filteredData = [];
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.field = {
    x: 'x',
    y: 'y',
  };
  state.label = {
    x: 'x',
    y: 'y',
  };
  state.brushSelection = [];
  state.isDifferentFields = false;
  state.isFieldChange = false;
  state.equationEditSelect = [];
  state.fileToFit = null;
  state.previousFit = '';
  state.fitError = null;
  state.fitScores = null;
  /* eslint-enable */
};

mutations.resetFitConfiguration = (state) => {
  /* eslint-disable */
  state.fitType = 'Linear';
  state.fitError = null;
  fitNote: '',
  state.label = {
    x: 'x',
    y: 'y',
  };
  state.fitScores = null;
  /* eslint-enable */
};

mutations.setFitType = (state, type = 'Linear') => {
  state.fitType = type; // eslint-disable-line
};

export default mutations;
