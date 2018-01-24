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
    state.isZoomBrush = true;
    state.brushes = [];
    state.brushSelections = {};
    state.brushScale = d3.scaleLinear();
    state.stitchedData = [];
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
  toggleZoomBrush(state, value) {
    // eslint-disable-next-line
    state.isZoomBrush = value;
  },
  setBrushes(state, value) {
    // eslint-disable-next-line
    state.brushes = value;
  },
  addNewBrush(state, value) {
    state.brushes.push(value);
  },
  setBrushSelections(state, value) {
    // eslint-disable-next-line
    state.brushSelections = value;
  },
  addBrushSelections(state, value) {
    // eslint-disable-next-line
    state.brushSelections = Object.assign({}, state.brushSelections, value);
  },
  saveBrushSelections(state) {
    // eslint-disable-next-line
    state.savedBrushSelections = _.cloneDeep(state.brushSelections);
  },
  saveBrushes(state) {
    // eslint-disable-next-line
    state.savedBrushes = _.cloneDeep(state.brushes);
  },
  resetBrushes(state) {
    // eslint-disable-next-line
    state.brushes = [];
  },
  resetBrushSelections(state) {
    // eslint-disable-next-line
    state.brushSelections = {};
  },
  setBrushScale(state, value) {
    // eslint-disable-next-line
    state.brushScale = value;
  },
  reconvertBrushSelections(state) {
    // eslint-disable-next-line
    state.brushSelections = _.mapValues(state.brushSelections, (el) => {
      return {
        raw: el.raw,
        converted: el.raw.map(i => state.brushScale.invert(i)),
      };
    });
  },
  setStitchedData(state, value) {
    // eslint-disable-next-line
    state.stitchedData = value;
  },
  resetStitchedData(state) {
    // eslint-disable-next-line
    state.stitchedData = [];
  },
  setBrowseData(state, value) {
    // eslint-disable-next-line
    state.browseData = value.length === 0 ? value : value.data;
  },
  updateTags(state, payload) {
    if (payload.loadType === 'fetched') {
      Vue.set(state.fetched[payload.filename], 'tags', payload.tags);
    } else {
      Vue.set(state.uploaded[payload.filename], 'tags', payload.tags);
    }
  },
};
