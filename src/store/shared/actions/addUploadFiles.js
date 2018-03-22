export default ({ commit }, files) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      commit('addUploadFiles', files);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
