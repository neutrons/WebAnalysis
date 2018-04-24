export default ({ state, commit }, files) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      const savedKeys = Object.keys(state.saved);
      // Go through files and if fetched file is in saved list
      // remove it so that updated data can be pulled in
      const keys = Object.keys(files);
      const fetchList = {};

      keys.forEach((key) => {
        if (savedKeys.indexOf(key) !== -1) commit('removeSavedFile', key);

        fetchList[key] = files[key];
      });

      commit('addToFetchList', fetchList);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
