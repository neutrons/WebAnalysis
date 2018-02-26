import _ from 'lodash';

export default (state) => {
  // normalize data in order to combine data on the same scale
  // normalization function: Y' = y / (K * normalizeField)

  const temp = _.cloneDeep(state.selectedData);
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
      // eslint-disable-next-line
      point.y = point.y / (state.normalizeValue * point[normField]);
    });

    // eslint-disable-next-line
    d.dataTransformed = d.dataTransformed.filter(point => isFinite(point.y) && point.y !== null); // filter for divide by zero
  });

  return temp;
};
