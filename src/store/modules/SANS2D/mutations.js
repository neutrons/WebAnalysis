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
  resetCurrentData(state) {
    // eslint-disable-next-line
    state.selectedData = [];
  },
  setCurrentData(state, chosenData) {
    const tempData = _.cloneDeep(chosenData);
    const tempSelect = [];

    for (let i = 0, len = tempData.length; i < len; i += 1) {
      const temp = tempData[i].data;
      const name = tempData[i].filename;

      tempSelect.push({
        filename: name,
        data: temp,
      });
    }

    // eslint-disable-next-line
    state.selectedData = tempSelect;
  },
};
