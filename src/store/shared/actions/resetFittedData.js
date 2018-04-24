export default async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('setFilteredData', []);
      commit('setFittedData', []);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
