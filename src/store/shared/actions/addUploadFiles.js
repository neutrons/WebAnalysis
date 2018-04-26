export default ({ commit }, files) =>
  new Promise((resolve, reject) => {
    try {
      commit('addUploadFiles', files);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
