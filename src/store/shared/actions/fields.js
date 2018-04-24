export const setXField = ({ commit }, value) =>
  new Promise((resolve, reject) => {
    try {
      commit('setXField', value);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export const setYField = ({ commit }, value) =>
  new Promise((resolve, reject) => {
    try {
      commit('setYField', value);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
