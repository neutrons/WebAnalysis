import swapFields from '../../../assets/js/swapFields';

export const normalizeData = (state) => {
  // normalize data in order to combine data on the same scale
  // normalization function: Y' = y / (K * normalizeField)

  const temp = state.selectedData;
  let normField;
  // check that the normalize field is not one of the fields
  // if so, relabel accordingly or else reference value will
  // be undefined
  if (state.field.x === state.normalizeField) {
    normField = 'x';
  } else if (state.field.y === state.normalizeField) {
    normField = 'y';
  } else {
    normField = state.normalizeField;
  }

  temp.forEach((d) => {
    d.dataTransformed.forEach((point) => {
      const oldY = point.y;
      // eslint-disable-next-line
      point.y = point.y / (state.normalizeValue * point[normField]);

      // Normalize the error value if normalized y is a valid number
      if (isFinite(point.y) && point.y !== null) {
        // eslint-disable-next-line
        point.error = Math.abs(point.y) * Math.sqrt(((point.error / oldY) ** 2) +
          ((Math.sqrt(point[normField]) / point[normField]) ** 2));
      }
    });

    // eslint-disable-next-line
    d.dataTransformed = d.dataTransformed.filter(point => isFinite(point.y) && point.y !== null); // filter for divide by zero
  });

  state.isNormalized = true; // eslint-disable-line
  state.combinedData = []; // eslint-disable-line
};

export const resetNormalizeData = (state) => {
  const temp = state.selectedData;
  temp.forEach((d) => {
    d.dataTransformed = swapFields(d.data, state.field); // eslint-disable-line
  });

  /* eslint-disable */
  state.normalizeValue = 1;
  state.normalizeField = 'time';
  state.isNormalized = false;
  state.combinedData = [];
  state.tolerance = state.defaultSettings.tolerance.value;
  /* eslint-enable */
};

