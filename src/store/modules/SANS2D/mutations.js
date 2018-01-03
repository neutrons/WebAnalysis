import Vue from 'vue';
import _ from 'lodash';

export default {
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
  updateFilters(state, selected) {
    // eslint-disable-next-line
    state.filters = selected;
  },
  storeData(state, payload) {
    const filename = payload.filename;
    const data = payload.data;

    Vue.set(state.saved, filename, data);
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
