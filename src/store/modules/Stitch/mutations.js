import Vue from 'vue';
import _ from 'lodash';
import * as d3 from 'd3';

export default {
  addFetchFiles(state, files) {
    const keys = Object.keys(files);
    keys.forEach((key) => {
      Vue.set(state.fetched, key, files[key]);

      if (state.colorDomain.indexOf(key) === -1) {
        state.colorDomain.push(key);
      }
    });
  },
  addUploadFiles(state, files) {
    const keys = Object.keys(files);
    keys.forEach((key) => {
      Vue.set(state.uploaded, key, files[key]);

      if (state.colorDomain.indexOf(key) === -1) {
        state.colorDomain.push(key);
      }
    });
  },
  updateFilesSelected(state, selected) {
    const keys = [];

    state.filesSelected.forEach((key) => {
      if (selected.indexOf(key) === -1) {
        keys.push(key);
      }
    });
    // eslint-disable-next-line
    state.deleteKeys = keys;
    // now update new list
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
  resetAll(state) {
    /* eslint-disable */
    state.selectedData = [];
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
    state.label = {
      x: 'q = x',
      y: 'I(q) = y',
    };
    state.deleteKeys = [];
    /* eslint-enable */
  },
  setXScale(state, x) {
    // eslint-disable-next-line
    state.plotScale.x = { label: x, value: state.scale.x[x].copy() };
  },
  setYScale(state, y) {
    // eslint-disable-next-line
    state.plotScale.y = { label: y, value: state.scale.y[y].copy() };
  },
  resetScales(state) {
    // eslint-disable-next-line
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
  },
  setWidth(state, value) {
    // eslint-disable-next-line
    state.width = value;
  },
  setHeight(state, value) {
    // eslint-disable-next-line
    state.height = value;
  },
  setViewBox(state, value) {
    // eslint-disable-next-line
    state.viewBox = value;
  },
  toggleZoomBrush(state, value) {
    // eslint-disable-next-line
    state.isZoomBrush = value;
  },
};
