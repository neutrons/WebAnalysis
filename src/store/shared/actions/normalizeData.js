export const normalizeData = async ({ commit, getters }) =>
  new Promise((resolve, reject) => {
    try {
      const data = getters.getPreparedData;
      commit('normalizeData', data);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const resetNormalizedData = async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('resetNormalizedData');

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
