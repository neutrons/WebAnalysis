export const normalizeData = async ({ commit, getters }) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      const data = getters.getPreparedData;
      commit('normalizeData', data);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const resetNormalizedData = async ({ commit }) => {
  commit('resetNormalizedData');
  return Promise.resolve(true);
};

