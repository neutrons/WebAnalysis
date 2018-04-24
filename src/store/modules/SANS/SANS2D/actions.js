import addFetchFiles from '../../../shared/actions/addFetchFiles';
import addUploadFiles from '../../../shared/actions/addUploadFiles';
import updateFilesSelected from '../../../shared/actions/updateFilesSelectedSANS2D';
import fetchData from '../../../shared/actions/fetchData';
import readData from '../../../shared/actions/readData';
import resetAll from '../../../shared/actions/resetAll';
import parseData from '../../../shared/actions/parseSANS2D';

export default {
  addFetchFiles,
  updateFilesSelected,
  fetchData,
  readData,
  resetAll,
  parseData,
  addUploadFiles,
  async setScale({ commit }, value) {
    return new Promise((resolve, reject) => {
      try {
        commit('setScale', value);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async resetScale({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('resetScale');

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async setBinSize({ commit }, value) {
    return new Promise((resolve, reject) => {
      try {
        commit('setBinSize', value);

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
  async resetBinSize({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('resetBinSize');

        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
};
