import addUploadFiles from '../../shared/actions/addUploadFiles';

function filterNormalizeFiles(files) {
  const names = Object.keys(files);
  const normalizeFiles = {};
  const dataFiles = {};

  for (let i = 0, length = names.length; i < length; i += 1) {
    const file = names[i];

    if (
      /IN_vcorr$/.exec(file) !== null ||
      /OUT_vcorr$/.exec(file) !== null ||
      /exclude_detectors$/.exec(file) !== null ||
      /gaps$/.exec(file) !== null
    ) {
      normalizeFiles[file] = files[file];
    } else {
      dataFiles[file] = files[file];
    }
  }

  return { normalizeFiles, dataFiles };
}

export default {
  addUploadFiles,
  addFetchFiles({ state, commit, dispatch }, files) { // eslint-disable-line
    // Lastly add data files
    return new Promise((resolve, reject) => {
      try {
        // First filter out files for Powder Normalization
        const filtered = filterNormalizeFiles(files);
        const normalizeFiles = filtered.normalizeFiles;
        const dataFiles = filtered.dataFiles;

        // Then store those filtered files
        commit('storeNormalizeFiles', normalizeFiles);

        // Then get saved fetch files
        const savedKeys = Object.keys(state.saved);
        // Go through files and if fetched file is in saved list
        // remove it so that updated data can be pulled in
        const keys = Object.keys(dataFiles);
        const fetchList = {};

        keys.forEach((key) => {
          if (savedKeys.indexOf(key) !== -1) {
            commit('removeSavedFile', key);
          }

          fetchList[key] = dataFiles[key];
        });

        commit('addToFetchList', fetchList);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
};
