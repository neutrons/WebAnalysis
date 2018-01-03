import Vue from 'vue';
import _ from 'lodash';
import * as d3 from 'd3';
import swapFields from '../../../assets/js/swapFields';

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
  updateFileToFit(state, selected) {
    // eslint-disable-next-line
    state.fileToFit = selected;
  },
  storeData(state, payload) {
    const filename = payload.filename;
    const data = payload.data;

    Vue.set(state.saved, filename, data);
  },
  resetAll(state) {
    /* eslint-disable */
    state.selectedData = [];
    state.field = { x: 'pt', y: 'detector' };
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
    /* eslinst-enable */
  },
  setCurrentData(state, chosenData) {
    const tempData = _.cloneDeep(chosenData);
    const tempSelect = [];

    tempData.forEach((d) => {
      const data = _.cloneDeep(d.data);
      const metadata = [...d.metadata];
      const filename = d.filename;
      const dataTransformed = swapFields(data, state.field);

      tempSelect.push({
        data,
        dataTransformed,
        filename,
        metadata,
      });
    });

    // eslint-disable-next-line
    state.selectedData = tempSelect;
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
  setXField(state, value) {
    // eslint-disable-next-line
    state.field.x = value;
  },
  setYField(state, value) {
    // eslint-disable-next-line
    state.field.y = value;
  },
  changeFields(state) {
    const tempSelect = [];

    state.selectedData.forEach((d) => {
      const data = _.cloneDeep(d.data);
      const metadata = [...d.metadata];
      const filename = d.filename;
      const dataTransformed = swapFields(data, state.field);

      tempSelect.push({
        data,
        dataTransformed,
        filename,
        metadata,
      });
    });

    // eslint-disable-next-line
    state.selectedData = tempSelect;
  },
  setFitEquation(state, value = state.fits[state.fitType].equation) {
    // eslint-disable-next-line
    state.fitEquation = value;
  },
  setFitDamping(state, value = state.defaultFitSettings.damping.value) {
    // eslint-disable-next-line
    state.fitSettings.damping = value;
  },
  setFitGradient(state, value = state.defaultFitSettings.gradientDifference.value) {
    // eslint-disable-next-line
    state.fitSettings.gradientDifference = value;
  },
  setFitIterations(state, value = state.defaultFitSettings.maxIterations.value) {
    // eslint-disable-next-line
    state.fitSettings.maxIterations = value;
  },
  setFitError(state, value = state.defaultFitSettings.errorTolerance.value) {
    // eslint-disable-next-line
    state.fitSettings.errorTolerance = value;
  },
  setFitEquation(state, value) {
    // eslint-disable-next-line
    state.fitEquation = value;
  },
  setFitInitialValues(state, value) {
    // eslint-disable-next-line
    state.fitInitialValues = value;
  },
  resetFitConfiguration(state) {
    /* eslint-disable */
    state.fitSettings = {
      damping: undefined,
      errorTolerance: undefined,
      gradientDifference: undefined,
      maxIterations: undefined,
    };
    state.fitEquation = undefined;
    state.fitInitialValues = [];
    /* eslint-enable */
  },
};
