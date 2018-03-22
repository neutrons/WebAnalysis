export const resetBrushSelection = async ({ commit }) => {
  commit('resetBrushSelection');
  return Promise.resolve(true);
};

export const setBrushLimits = async ({ commit }, payload) => {
  commit('setBrushLimits', payload);
  return Promise.resolve(true);
};

export const setBrushSelection = async ({ commit }, value) => {
  commit('setBrushSelection', value);
  return Promise.resolve(true);
};
