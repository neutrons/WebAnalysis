export default async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('resetFitSettings');
      commit('resetFitConfiguration');

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
