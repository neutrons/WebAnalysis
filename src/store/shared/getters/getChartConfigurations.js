export default (state, getters) => {
  const data = getters.getPreparedData;
  const scales = state.plotScale;
  const fileToFit = state.fileToFit;

  return {
    fileToFit,
    data,
    scales,
  };
};
