export default ({ commit, state }) => {
  /* eslint-disable */
  commit('resetFitSettings');

  state.fitType = 'Linear';
  state.fitEquation = undefined;
  state.fitInitialValues = [];
  state.transformations = {
    x: 'x',
    y: 'y',
    error: 'error',
  };
  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  /* eslint-enable */
};
