export default ({ commit }) => {
  commit('resetAll');
  return Promise.resolve(true);
};
