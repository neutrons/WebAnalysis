export default async ({ commit }) => { // eslint-disable-line
  commit('setFilteredData', []);
  commit('setFittedData', []);
  return Promise.resolve(true);
};
