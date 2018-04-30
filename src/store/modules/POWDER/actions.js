import pp from 'papaparse';

import fetchData from '../../shared/actions/fetchData';
import readData from '../../shared/actions/readData';
import configVCorr from '../../../assets/js/readFiles/configs/POWDERVCorr';
import configGaps from '../../../assets/js/readFiles/configs/POWDERGaps';

export default {
  fetchData,
  readData,
  async addUploadFiles({ state, commit, dispatch }, files) {
    return new Promise(async (resolve, reject) => {
      try {
        // First filter out files for Powder Normalization
        let normalizeFiles = {};
        let dataFiles = {};

        // if normalize files exist trigger action to get normalize data
        if (typeof files.normalizeFiles !== 'undefined') {
          normalizeFiles = files.normalizeFiles;
          await dispatch('loadNormalizeFiles', { type: 'upload', normalizeFiles })
            .catch((error) => {
              reject(error);
            });
        }

        // if data files exist trigger action to store data files
        if (typeof files.dataFiles !== 'undefined') {
          dataFiles = files.dataFiles;
          await dispatch('loadDataFiles', { type: 'upload', dataFiles })
            .catch((error) => {
              reject(error);
            });
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async addFetchFiles({ state, commit, dispatch }, files) {
    return new Promise(async (resolve, reject) => {
      try {
        // First filter out files for Powder Normalization
        let normalizeFiles = {};
        let dataFiles = {};

        if (typeof files.normalizeFiles !== 'undefined') {
          normalizeFiles = files.normalizeFiles;
          await dispatch('loadNormalizeFiles', { type: 'fetch', normalizeFiles })
            .catch((error) => {
              reject(error);
            });
        }

        if (typeof files.dataFiles !== 'undefined') {
          dataFiles = files.dataFiles;
          await dispatch('loadDataFiles', { type: 'fetch', dataFiles })
            .catch((error) => {
              reject(error);
            });

          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  async loadNormalizeFiles({ state, commit, dispatch }, payload) {
    const normalizeFiles = payload.normalizeFiles;
    const type = payload.type;

    return new Promise(async (resolve, reject) => {
      try {
        // Then store those normalized files
        commit('storeNormalizeFiles', normalizeFiles);

        // Then read and grab data from eclude detector files
        if (normalizeFiles.exclude_detectors.length > 0) {
          await dispatch('readExcludeDetectorsFileData', type)
          .catch((error) => {
            reject(error);
          });
        }

        // Then read and grab data for vcorr files
        if (normalizeFiles.vcorr.length > 0) {
          await dispatch('readVCorrFileData', type)
          .catch((error) => {
            reject(error);
          });
        }

        // Then read and grap data for gaps files
        if (normalizeFiles.gaps.length > 0) {
          await dispatch('readGapsFileData', type)
            .catch((error) => {
              reject(error);
            });
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async loadDataFiles({ state, commit, dispatch }, payload) {
    const dataFiles = payload.dataFiles;
    const type = payload.type;

    return new Promise(async (resolve, reject) => {
      try {
        // Then get saved files
        const savedKeys = Object.keys(state.saved);
        // Go through files and if fetched file is in saved list
        // remove it so that updated data can be pulled in
        const keys = Object.keys(dataFiles);
        const list = {};

        keys.forEach((key) => {
          if (savedKeys.indexOf(key) !== -1) {
            commit('removeSavedFile', key);
          }

          list[key] = dataFiles[key];
        });

        // add to upload or fetch list depending on type
        if (type === 'upload') {
          commit('addUploadFiles', list);
        } else {
          commit('addToFetchList', list);
        }

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async readExcludeDetectorsFileData({ state, dispatch, commit }, type) {
    return new Promise(async (resolve, reject) => {
      try {
        // get exclude detector data
        const actionName = type === 'fetch' ? 'fetchData' : 'readData';
        const excludeDetectorData = await dispatch(actionName, state.normalizeFiles.exclude_detectors); // eslint-disable-line

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
  async readVCorrFileData({ state, dispatch, commit }, type) {
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
        const actionName = type === 'fetch' ? 'fetchData' : 'readData';
        const vCorrData = await dispatch(actionName, state.normalizeFiles.vcorr);

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
  async readGapsFileData({ state, dispatch, commit }, type) {
    return new Promise(async (resolve, reject) => {
      try {
        // get gaps detector data
        const actionName = type === 'fetch' ? 'fetchData' : 'readData';
        const gapsData = await dispatch(actionName, state.normalizeFiles.gaps);

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
