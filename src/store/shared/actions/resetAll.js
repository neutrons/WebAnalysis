export default async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('resetAll');

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
