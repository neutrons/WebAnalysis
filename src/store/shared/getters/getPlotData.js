export default (state, getters) => {
  if (getters.getPreparedData.length === 0) return [];

  return getters.getPreparedData.map(d => d.values)
    .reduce((a, b) => a.concat(b));
};
