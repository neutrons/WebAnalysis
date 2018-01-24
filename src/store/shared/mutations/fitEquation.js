export const updateFitEquation = (state, value) => {
  // eslint-disable-next-line
  state.fitEquation = value;
};

export const setFitEquation = (state, value = state.fits[state.fitType].equation) => {
  // eslint-disable-next-line
  state.fitEquation = value;
};
