import Vue from 'vue';
import _ from 'lodash';
import * as d3 from 'd3';
import transformData from '../../../assets/js/FitData/transformData';

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
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
    state.transformations = {
      x: 'x',
      y: 'y',
    };
    /* eslinst-enable */
  },
  setCurrentData(state, chosenData) {
    const field = _.cloneDeep(state.field);
    const tempData = _.cloneDeep(chosenData);
    const tempSelect = [];

    for (let i = 0, len = tempData.length; i < len; i += 1) {
      const data = tempData[i].data;
      const filename = tempData[i].filename;

      if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
        const dataTransformed = transformData(data, state.transformations, field);

        tempSelect.push({
          filename,
          data,
          dataTransformed,
        });
      } else {
        const dataTransformed = _.cloneDeep(data);

        tempSelect.push({
          filename,
          data,
          dataTransformed,
        });
      }
    }

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
  setXTransformation(state, x) {
    // eslint-disable-next-line
    state.transformations.x = x;
  },
  setYTransformation(state, y) {
    // eslint-disable-next-line
    state.transformations.y = y;
  },
  setTransformations(state, payload) {
    // eslint-disable-next-line
    state.transformations = {
      x: payload.x,
      y: payload.y,
    };
  },
  resetTransformations(state) {
    // eslint-disable-next-line
    state.transformations = {
      x: state.fits[state.fitType].transformations.x,
      y: state.fits[state.fitType].transformations.y,
      error: state.fits[state.fitType].transformations.error,
    };
  },
  transformData(state) {
    const tempData = _.cloneDeep(state.selectedData);

    state.selectedData.forEach((el) => {
      if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
        el.dataTransformed = transformData(el.data, state.transformations);
      } else {
        el.dataTransformed = _.cloneDeep(el.data);
      }
    })
  },
  setFitType(state, type = state.fitType) {
    /* eslint-disable */
    state.fitType = type;
    state.fitEquation = state.fits[type].equation;
    state.transformations.x = state.fits[type].transformations.x;
    state.transformations.y = state.fits[type].transformations.y;
    state.transformations.error = state.fits[type].transformations.error;
    state.fitInitialValues = _.cloneDeep(state.fits[type].initialValues);
    /* eslint-enable */
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
  setFitInitialValues(state) {
    // eslint-disable-next-line
    state.fitInitialValues = _.cloneDeep(state.fits[state.fitType].initialValues);
  },
  resetFitConfiguration(state) {
    /* eslint-disable */
    state.fitSettings = {
      damping: undefined,
      errorTolerance: undefined,
      gradientDifference: undefined,
      maxIterations: undefined,
    };
    state.fitType = 'Linear';
    state.fitEquation = undefined;
    state.fitInitialValues = [];
    state.transformations = {
      x: 'x',
      y: 'y',
      error: 'error',
    };
    /* eslint-enable */
  },
};
