export default (state) => {
  /* eslint-disable */
  state.transformations = {
    x: state.fits[state.fitType].transformations.x,
    y: state.fits[state.fitType].transformations.y,
    error: state.fits[state.fitType].transformations.error,
  };

  state.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  /* eslint-enable */
};
