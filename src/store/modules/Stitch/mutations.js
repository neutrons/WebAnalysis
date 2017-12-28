import Vue from 'vue';
import * as d3 from 'd3';
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

    // If file to fit is not in files selected, remove it
    if (state.filesSelected.indexOf(state.fileToFit) === -1) {
      // eslint-disable-next-line
      state.fileToFit = null;
    }
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
      const dataTransformed = _.cloneDeep(temp);

      tempSelect.push({
        filename: name,
        data: temp,
        dataTransformed,
      });
    }

    // eslint-disable-next-line
    state.selectedData = tempSelect;
  },
  setXScale(state, x) {
    // eslint-disable-next-line
    state.plotScale.x = { label: x, value: _.cloneDeep(state.scale.x[x]) };
  },
  setYScale(state, y) {
    // eslint-disable-next-line
    state.plotScale.y = { label: y, value: _.cloneDeep(state.scale.y[y]) };
  },
  resetScales(state) {
    // eslint-disable-next-line
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
  },
};
