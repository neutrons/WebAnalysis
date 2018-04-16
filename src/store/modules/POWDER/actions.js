import pp from 'papaparse';

import addUploadFiles from '../../shared/actions/addUploadFiles';
import fetchData from '../../shared/actions/fetchData';

function filterNormalizeFiles(files) {
  const names = Object.keys(files);
  const normalizeFiles = {
    in_vcorr: [],
    out_vcorr: [],
    exclude_detectors: [],
    gaps: [],
  };

  const dataFiles = {};

  for (let i = 0, length = names.length; i < length; i += 1) {
    const file = names[i];

    if (/IN_vcorr$/.exec(file) !== null) {
      normalizeFiles.in_vcorr.push(files[file]);
    } else if (/OUT_vcorr$/.exec(file) !== null) {
      normalizeFiles.out_vcorr.push(files[file]);
    } else if (/exclude_detectors$/.exec(file) !== null) {
      normalizeFiles.exclude_detectors.push(files[file]);
    } else if (/gaps$/.exec(file) !== null) {
      normalizeFiles.gaps.push(files[file]);
    } else {
      dataFiles[file] = files[file];
    }
  }

  return { normalizeFiles, dataFiles };
}

export default {
  addUploadFiles,
  fetchData,
  async addFetchFiles({ state, commit, dispatch }, files) { // eslint-disable-line
    return new Promise((resolve, reject) => {
      try {
        // First filter out files for Powder Normalization
        const filtered = filterNormalizeFiles(files);
        const normalizeFiles = filtered.normalizeFiles;
        const dataFiles = filtered.dataFiles;

        // Then store those filtered files
        commit('storeNormalizeFiles', normalizeFiles);

        // Then read and grab data from normalize files
        dispatch('readNormalizeFileData')
          .then(() => {
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
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
  async readNormalizeFileData({ state, dispatch, commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        // get exclude detector data
        const excludeDetectorData = await dispatch('fetchData', state.normalizeFiles.exclude_detectors);

        // parse exclude detector data
        const excludeData = excludeDetectorData.map((d) => {
          const data = pp.parse(d.data).data;
          return data.reduce((a, b) => a.concat(b), []);
        }).reduce((a, b) => a.concat(b), [])
        .map(d => (+d + 1)); // node might be a string so convert to number and add one

        commit('addExcludeDetectorData', excludeData);

        // set initial anodes to exclude for POWDER Combine
        commit('Combine/setAnodesToExclude', excludeData);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
};
