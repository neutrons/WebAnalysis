import getters from '../getters';

getters.plotMetadata = (state) => {
  if (!Object.keys(state.browseData).length) return [];

  return state.browseData.metadata;
};

export default getters;
