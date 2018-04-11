import * as d3 from 'd3';

import mutations from '../mutations';
import setCurrentData from '../../../shared/mutations/setCurrentDataTAS';

mutations.setCurrentData = setCurrentData;

mutations.setNormalizeValue = (state, value) => {
  // eslint-disable-next-line
  state.normalizeValue = value;
};

mutations.setNormalizeField = (state, value) => {
  // eslint-disable-next-line
  state.normalizeField = value;
};

mutations.updateFilesToAdd = (state, selected) => {
  const keys = [];

  state.filesToAdd.forEach((key) => {
    if (selected.indexOf(key) === -1) {
      keys.push(key);
    }
  });

  // eslint-disable-next-line
  state.filesToAdd = selected;
  // eslint-disable-next-line
  state.filesSelected.add = selected;
};

mutations.updateFilesToSubtract = (state, selected) => {
  const keys = [];

  state.filesToSubtract.forEach((key) => {
    if (selected.indexOf(key) === -1) {
      keys.push(key);
    }
  });

  // eslint-disable-next-line
  state.filesToSubtract = selected;
  // eslint-disable-next-line
  state.filesSelected.subtract = selected;
};

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.filesToSubtract = [];
  state.filesToAdd = [];
  state.combinedData = [];
  state.selectedData = [];
  state.isNormalized = false;
  state.normalizeValue = state.defaultSettings.normalize.value;
  state.tolerance = state.defaultSettings.tolerance.value;
  state.field = {
    x: 'x',
    y: 'y',
  };
  state.normalizeField = 'time';
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.isFieldChange = false;
  /* eslint-enable */
};

export default mutations;
