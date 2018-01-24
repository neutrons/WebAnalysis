export default (state, type = state.fitType) => {
  /* eslint-disable */
  state.fitType = type;
  state.fitEquation = state.fits[type].equation;
  state.transformations.x = state.fits[type].transformations.x;
  state.transformations.y = state.fits[type].transformations.y;
  state.transformations.error = state.fits[type].transformations.error;
  state.fitInitialValues = _.cloneDeep(state.fits[type].initialValues);
  state.fitNote = state.fits[type].note;
  /* eslint-enable */
};
