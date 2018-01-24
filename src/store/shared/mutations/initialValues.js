export const removeFitInitialValue = (state, value) => {
  const indices = [];

  state.fitInitialValues.forEach((iv, index) => {
    if (value.indexOf(iv.coefficient) > -1) indices.push(index);
  });

  indices.forEach(el => state.fitInitialValues.splice(el, 1));
};

export const addFitInitialValue = (state, value) => {
  value.forEach((v) => {
    state.fitInitialValues.push({
      coefficient: v,
      value: 1,
      constant: false,
    });
  });
};

export const setFitInitialValues = (state, value = state.fits[state.fitType].initialValues) => {
  /* Note: Make sure to add a method
     to compile initial values with
     mathjs that are string formulas
   */
  // eslint-disable-next-line
  state.fitInitialValues = _.cloneDeep(value);
};

export const reviseFitInitialValues = (state, value) => {
  // eslint-disable-next-line
  state.fitInitialValues = value;
};
