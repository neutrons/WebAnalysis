import deletePoint from '../../shared/actions/deletePoint';
import parseData from '../../shared/actions/parseSANS1D';
import updateFilesSelected from '../../shared/actions/updateFilesSelected';
import setCurrentData from '../../shared/actions/setCurrentData';
import fetchData from '../../shared/actions/fetchData';
import readData from '../../shared/actions/readData';
import resetAll from '../../shared/actions/resetAll';
import { setXScale, setYScale, resetScales } from '../../shared/actions/scales';

export default {
  fetchData,
  readData,
  deletePoint,
  updateFilesSelected,
  parseData,
  setXScale,
  setYScale,
  resetScales,
  resetAll,
  setCurrentData,
  setStitchedData({ commit }, value) {
    commit('setStitchedData', value);
    return Promise.resolve(true);
  },
  resetStitchedData({ commit }) {
    commit('resetStitchedData');
    return Promise.resolve(true);
  },
};
