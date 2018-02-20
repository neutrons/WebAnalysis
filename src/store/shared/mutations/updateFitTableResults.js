export default (state, payload) => {
  // eslint-disable-next-line
  state.fittedData = payload.fittedData;
  // eslint-disable-next-line
  state.fitError = payload.fitError;
  // eslint-disable-next-line
  state.fitInitialValues = payload.iv;
  // eslint-disable-next-line
  state.fitScores = payload.scores;
};
