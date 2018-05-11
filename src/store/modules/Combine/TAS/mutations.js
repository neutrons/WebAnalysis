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
  // data is an array with the scans to normalize
  // every scan is a object: key is the scan name
  // normalize data in order to combine data on the same scale
  // normalization function: Y' = y / (K * normalizeField)
  const tempData = _.cloneDeep(data);
  const normField = state.normalizeField; // the name of the field. Eg. time, monitor, etc
  const normValue = state.normalizeValue; // the value
  const yField = state.field.y; // name of y axis. E.g detector
  // console.log(state);
  // console.log(data);

  let normFields = [];
  let yFields = [];
  const regexMagneticField = /(\w+)_(\d+)/;

  const matchedYField = yField.match(regexMagneticField);

  if (matchedYField !== null) {
    // We are in the case detector_1, detector_2, etc
    // headers in the data in the data file
    const headers = Object.keys(data[0].values[0]);
    // Let's find the suffix numbers in the headers
    const numberSuffix = [];
    headers.filter((header) => {
      const match = header.match(regexMagneticField);
      if (match !== null) {
        numberSuffix.push(match[2]);
        return true;
      }
      return false;
    });
    const numberSuffixUnique = [...new Set(numberSuffix)];
    normFields = numberSuffixUnique.map(e => `${normField}_${e}`);
    yFields = numberSuffixUnique.map(e => `${matchedYField[1]}_${e}`);
  } else {
    normFields = [normField];
    yFields = [yField];
  }
  // console.log(normFields);
  // console.log(yFields);

  // first normalize data
  // for each data set
  tempData.forEach((d) => {
    normFields.forEach((normFieldIt, index) => {
      const yFieldIt = yFields[index];
      // Iterating over the data sets to combine and normalize
      // For each point inside the dataset
      d.values.forEach((point) => {
        const C = point[normFieldIt];
        const errorC = Math.sqrt(C);
        const oldY = point[yFieldIt];
        const normY = point[yFieldIt] / (normValue * C);
        const error = point.error;

        // console.log(C, errorC, oldY, normY, error);

        if (isFinite(normY) && normY !== null) {
          const normError = Math.abs(normY) * Math.sqrt(Math.pow(error / oldY, 2) + Math.pow(errorC / C, 2)); // eslint-disable-line
          point.error = normError; // eslint-disable-line
        }

        point[yFieldIt] = normY; // eslint-disable-line
      });
      // eslint-disable-next-line
      d.values = d.values.filter(point => isFinite(point[yFieldIt]) && point[yFieldIt] !== null); // filter for divide by zero
    });
  }); // normFields

  // set the normalized data to selected data's transformed data
  for (let i = 0, length = tempData.length; i < length; i += 1) {
    const name = tempData[i].key;

    state.selectedData.forEach((curve) => {
      if (curve.filename === name) {
        state.selectedData[i].dataTransformed = tempData[i].values; // eslint-disable-line
      }
    });
  }

  // console.error(state.selectedData);

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
