export const setXField = ({ commit }, value) => {
  commit('setXField', value);
  return Promise.resolve(true);
};

export const setYField = ({ commit }, value) => {
  commit('setYField', value);
  return Promise.resolve(true);
};
