import _ from 'lodash';

export const normalizeData = (state) => {
  // normalize data in order to combine data on the same scale
  // normalization function: Y' = y / (K * normalizeField)

  const tempData = state.selectedData;
  const normField = state.normalizeField;
  const normValue = state.normalizeValue;
  const yField = state.field.y;

  tempData.forEach((d) => {
    d.dataTransformed.forEach((point) => {
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
    d.dataTransformed = d.dataTransformed.filter(point => isFinite(point[yField]) && point[yField] !== null); // filter for divide by zero
  });

  state.isNormalized = true; // eslint-disable-line
  state.combinedData = []; // eslint-disable-line
};

export const resetNormalizeData = (state) => {
  const tempData = state.selectedData;

  tempData.forEach((d) => {
    d.dataTransformed = _.cloneDeep(d.data); // eslint-disable-line
  });

  /* eslint-disable */
  state.normalizeValue = 1;
  state.normalizeField = 'time';
  state.isNormalized = false;
  state.combinedData = [];
  state.tolerance = state.defaultSettings.tolerance.value;
  /* eslint-enable */
};

