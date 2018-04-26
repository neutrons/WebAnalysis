export default ({ commit }, files) =>
  new Promise((resolve, reject) => {
    try {
      console.log('actions upload files', files);
      commit('addUploadFiles', files);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
