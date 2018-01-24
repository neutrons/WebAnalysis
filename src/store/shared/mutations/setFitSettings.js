export const setFitDamping = (state, value = state.defaultFitSettings.damping.value) => {
  // eslint-disable-next-line
  state.fitSettings.damping = value;
};

export const setFitGradient = (state,
    value = state.defaultFitSettings.gradientDifference.value) => {
  // eslint-disable-next-line
  state.fitSettings.gradientDifference = value;
};

export const setFitIterations = (state, value = state.defaultFitSettings.maxIterations.value) => {
  // eslint-disable-next-line
  state.fitSettings.maxIterations = value;
};

export const setFitError = (state, value = state.defaultFitSettings.errorTolerance.value) => {
  // eslint-disable-next-line
  state.fitSettings.errorTolerance = value;
};

export const resetFitSettings = (state) => {
  // eslint-disable-next-line
  state.fitSettings = {
    damping: state.defaultFitSettings.damping.value,
    errorTolerance: state.defaultFitSettings.errorTolerance.value,
    gradientDifference: state.defaultFitSettings.gradientDifference.value,
    maxIterations: state.defaultFitSettings.maxIterations.value,
  };
};

