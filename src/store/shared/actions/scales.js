export const resetScales = async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('resetScales');

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const setXScale = async ({ commit }, x) =>
  new Promise((resolve, reject) => {
    try {
      commit('setXScale', x);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const setYScale = async ({ commit }, y) =>
  new Promise((resolve, reject) => {
    try {
      commit('setYScale', y);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
