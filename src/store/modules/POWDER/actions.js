import pp from 'papaparse';

import addUploadFiles from '../../shared/actions/addUploadFiles';
import fetchData from '../../shared/actions/fetchData';
import configVCorr from '../../../assets/js/readFiles/configs/POWDERVCorr';
import configGaps from '../../../assets/js/readFiles/configs/POWDERGaps';

function filterNormalizeFiles(files) {
  const names = Object.keys(files);
  const normalizeFiles = {
    vcorr: [],
    exclude_detectors: [],
    gaps: [],
  };

  const dataFiles = {};

  for (let i = 0, length = names.length; i < length; i += 1) {
    const file = names[i];

    if (/IN_vcorr$/.exec(file) !== null || /OUT_vcorr$/.exec(file) !== null) {
      normalizeFiles.vcorr.push(files[file]);
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
        // Then read and grab data for vcorr files
        // Then read and grap data for gaps files
        dispatch('readExcludeDetectorsFileData')
          .then(dispatch('readVCorrFileData'))
          .then(dispatch('readGapsFileData'))
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
  async readExcludeDetectorsFileData({ state, dispatch, commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        // get exclude detector data
        const excludeDetectorData = await dispatch('fetchData', state.normalizeFiles.exclude_detectors);

        // parse exclude detector data
        const excludeData = excludeDetectorData.map((d) => {
          const data = pp.parse(d.data).data;
          return data.reduce((a, b) => a.concat(b), []);
        }).reduce((a, b) => a.concat(b), [])
        .map(d => (+d)); // node might be a string so convert to number and add one

        commit('addExcludeDetectorData', excludeData);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async readVCorrFileData({ state, dispatch, commit }) {
    // general function to call vcorr parsing
    function parseData(data) {
      const result = {};

      data.forEach((d) => {
        const parsedResult = pp.parse(d.data, configVCorr);
        const name = d.filename.match(/Ge_(\d+)_(IN|OUT)/g) || d.filename;
        result[name] = parsedResult.data[0];
      });

      return result;
    }

    return new Promise(async (resolve, reject) => {
      try {
        // get vcorr detector data
        const vCorrData = await dispatch('fetchData', state.normalizeFiles.vcorr);

        // parse vcorr data
        const vCorrParsed = parseData(vCorrData);

        // add vcorr data
        commit('addVCorrData', vCorrParsed);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async readGapsFileData({ state, dispatch, commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        // get gaps detector data
        const gapsData = await dispatch('fetchData', state.normalizeFiles.gaps);

        // parse gaps data
        const gapsParsed = gapsData.map((data) => {
          const parsedData = pp.parse(data.data, configGaps).data;
          const filename = data.filename;

          return { filename, data: parsedData };
        });

        // add gaps data
        commit('addGapsData', gapsParsed);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
};
