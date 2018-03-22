export const normalizeData = async ({ commit }) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      commit('normalizeData');
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

