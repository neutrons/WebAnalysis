export const resetScales = ({ commit }) => {
  commit('resetScales');
  return Promise.resolve(true);
};

export const setXScale = ({ commit }, x) => {
  commit('setXScale', x);
  return Promise.resolve(true);
};

export const setYScale = ({ commit }, y) => {
  commit('setYScale', y);
  return Promise.resolve(true);
};
