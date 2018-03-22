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
  setScale({ commit }, value) {
    commit('setScale', value);
  },
  resetScale({ commit }) {
    commit('resetScale');
  },
  setBinSize({ commit }, value) {
    commit('setBinSize', value);
    return Promise.resolve(true);
  },
  resetBinSize({ commit }) {
    commit('resetBinSize');
  },
};
