import * as d3 from 'd3';
import _ from 'lodash';

import mutations from '../mutations';
import setCurrentData from '../../../shared/mutations/setCurrentDataTAS';
import { setXField, setYField } from '../../../shared/mutations/fields';

const tasMutations = _.cloneDeep(mutations);

tasMutations.setXField = setXField;
tasMutations.setYField = setYField;

tasMutations.setCurrentData = setCurrentData;

tasMutations.setNormalizeValue = (state, value) => {
  // eslint-disable-next-line
  state.normalizeValue = value;
};

tasMutations.setNormalizeField = (state, value) => {
  // eslint-disable-next-line
  state.normalizeField = value;
};

tasMutations.updateFilesToAdd = (state, selected) => {
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

tasMutations.updateFilesToSubtract = (state, selected) => {
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

tasMutations.resetAll = (state) => {
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

tasMutations.normalizeData = (state, data) => {
  // normalize data in order to combine data on the same scale
  // normalization function: Y' = y / (K * normalizeField)
  const tempData = _.cloneDeep(data);
  const normField = state.normalizeField;
  const normValue = state.normalizeValue;
  const yField = state.field.y;

  // first normalize data
  tempData.forEach((d) => {
    d.values.forEach((point) => {
      const C = point[normField];
      const errorC = Math.sqrt(C);
      const oldY = point[yField];
      const normY = point[yField] / (normValue * C);
      const error = point.error;

      if (isFinite(normY) && normY !== null) {
        const normError = Math.abs(normY) * Math.sqrt(Math.pow(error / oldY, 2) + Math.pow(errorC / C, 2)); // eslint-disable-line
        point.error = normError; // eslint-disable-line
      }

      point[yField] = normY; // eslint-disable-line
    });

    // eslint-disable-next-line
    d.values = d.values.filter(point => isFinite(point[yField]) && point[yField] !== null); // filter for divide by zero
  });

  // set the normalized data to selected data's transformed data
  for (let i = 0, length = tempData.length; i < length; i += 1) {
    state.selectedData[i].dataTransformed = tempData[i].values; // eslint-disable-line
  }

  state.isNormalized = true; // eslint-disable-line
  state.combinedData = []; // eslint-disable-line
};

tasMutations.resetNormalizedData = (state) => {
  const tempData = state.selectedData;

  tempData.forEach((d) => {
    // eslint-disable-next-line
    d.dataTransformed = _.cloneDeep(d.data);
  });

  /* eslint-disable */
  state.normalizeValue = 1;
  state.normalizeField = 'time';
  state.isNormalized = false;
  state.combinedData = [];
  state.tolerance = state.defaultSettings.tolerance.value;
  /* eslint-enable */
};

export default tasMutations;
