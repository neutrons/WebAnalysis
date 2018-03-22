export default ({ commit }) => {
  commit('resetFitSettings');
  commit('resetFitConfiguration');
  return Promise.resolve(true);
};
