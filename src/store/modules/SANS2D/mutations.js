import Vue from 'vue';
import _ from 'lodash';

import storeData from '../../shared/mutations/storeData';
import updateFilters from '../../shared/mutations/updateFilters';

export default {
  storeData,
  updateFilters,
  addFetchFiles(state, files) {
    const keys = Object.keys(files);
    keys.forEach((key) => {
      Vue.set(state.fetched, key, files[key]);
    });
  },
  addUploadFiles(state, files) {
    const keys = Object.keys(files);
    keys.forEach((key) => {
      Vue.set(state.uploaded, key, files[key]);
    });
  },
  updateFilesSelected(state, selected) {
    // eslint-disable-next-line
    state.filesSelected = selected;
  },
  resetAll(state) {
    /* eslint-disable */
    state.selectedData = [];
    state.hexBinSize = 15;
    state.hexScale = 'Log';
    /* eslint-enable */
  },
  setCurrentData(state, payload) {
    const data = _.cloneDeep(payload.data);
    const filename = payload.filename;

    // eslint-disable-next-line
    state.selectedData = [{ data, filename }];
  },
  setScale(state, value) {
    // eslint-disable-next-line
    state.hexScale = value;
  },
  resetScale(state) {
    // eslint-disable-next-line
    state.hexScale = 'Log';
  },
  setBinSize(state, value) {
    // eslint-disable-next-line
    state.hexBinSize = value;
  },
  resetBinSize(state) {
    // eslint-disable-next-line
    state.hexBinSize = 15;
  },
};
