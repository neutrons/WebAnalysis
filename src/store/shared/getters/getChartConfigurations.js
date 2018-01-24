import _ from 'lodash';

export default (state, getters) => {
  const fitSettings = _.cloneDeep(state.fitSettings);
  const data = getters.getPreparedData;
  const scales = state.plotScale;
  const labels = state.label;
  const fileToFit = state.fileToFit;

  return {
    fitSettings,
    fileToFit,
    data,
    scales,
    labels,
  };
};