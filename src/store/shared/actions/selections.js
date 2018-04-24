// actions used for the fit component to change brush values for plot slider
export const resetBrushSelection = async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('resetBrushSelection');

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const setBrushLimits = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('setBrushLimits', payload);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const setBrushSelection = async ({ commit }, value) =>
  new Promise((resolve, reject) => {
    try {
      commit('setBrushSelection', value);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
