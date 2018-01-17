import Vue from 'vue';
import _ from 'lodash';
import * as d3 from 'd3';
import swapFields from '../../../assets/js/swapFields';

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
  setPreviousFit(state, value) {
    // eslint-disable-next-line
    state.previousFit = value;
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
    state.label = {
      x: 'q = x',
      y: 'I(q) = y',
    };
    state.deleteKeys = [];
    state.fittedData = [];
    /* eslint-enable */
  },
  setCurrentData(state, chosenData) {
    const tempData = _.cloneDeep(chosenData);
    const tempSelect = [];

    for (let i = 0, len = tempData.length; i < len; i += 1) {
      const data = _.cloneDeep(tempData[i].data);
      const filename = tempData[i].filename;
      const metadata = [...tempData[i].metadata];
      const dataTransformed = swapFields(data, state.field);

      tempSelect.push({
        data,
        dataTransformed,
        filename,
        metadata,
      });
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
    /* eslint-disable */
    state.transformations.x = x;
    state.label.x = `q = ${x}`;
    /* eslint-enable */
  },
  setYTransformation(state, y) {
    /* eslint-disable */
    state.transformations.y = y;
    state.label.y = `I(q) = ${y}`;
    /* eslint-enable */
  },
  setTransformations(state, payload) {
    // eslint-disable-next-line
    state.transformations = {
      x: payload.x,
      y: payload.y,
    };
  },
  resetTransformations(state) {
    /* eslint-disable */
    state.transformations = {
      x: state.fits[state.fitType].transformations.x,
      y: state.fits[state.fitType].transformations.y,
      error: state.fits[state.fitType].transformations.error,
    };

    state.label = {
      x: 'q = x',
      y: 'I(q) = y',
    };
    /* eslint-enable */
  },
  transformData(state) {
    state.selectedData.forEach((el) => {
      if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
        // eslint-disable-next-line
        el.dataTransformed = transformData(el.data, state.transformations);
      } else {
        // eslint-disable-next-line
        el.dataTransformed = _.cloneDeep(el.data);
      }
    });
  },
  setFitList(state, value = 'Linear') {
    // eslint-disable-next-line
    state.fitType = [...value];
  },
  setFitType(state, type = state.fitType) {
    /* eslint-disable */
    console.log('Set fit equation tas:', type);
    state.fitType = type;
    state.fitEquation = state.fits[type].equation;
    state.transformations.x = state.fits[type].transformations.x;
    state.transformations.y = state.fits[type].transformations.y;
    state.transformations.error = state.fits[type].transformations.error;
    state.fitInitialValues = _.cloneDeep(state.fits[type].initialValues);
    state.fitNote = state.fits[type].note;
    /* eslint-enable */
  },
  updateFitEquation(state, value) {
    // eslint-disable-next-line
    state.fitEquation = value;
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
  removeFitInitialValue(state, value) {
    const indices = [];

    state.fitInitialValues.forEach((iv, index) => {
      if (value.indexOf(iv.coefficient) > -1) indices.push(index);
    });

    indices.forEach(el => state.fitInitialValues.splice(el, 1));
  },
  addFitInitialValue(state, value) {
    value.forEach((v) => {
      state.fitInitialValues.push({
        coefficient: v,
        value: 1,
        constant: false,
      });
    });
  },
  setFitInitialValues(state, value = state.fits[state.fitType].initialValues) {
    /* Note: Make sure to add a method
       to compile initial values with
       mathjs that are string formulas
     */
    // eslint-disable-next-line
    state.fitInitialValues = _.cloneDeep(value);
  },
  resetFitSettings(state) {
    // eslint-disable-next-line
    state.fitSettings = {
      damping: state.defaultFitSettings.damping.value,
      errorTolerance: state.defaultFitSettings.errorTolerance.value,
      gradientDifference: state.defaultFitSettings.gradientDifference.value,
      maxIterations: state.defaultFitSettings.maxIterations.value,
    };
  },
  resetFitConfiguration(state) {
    /* eslint-disable */
    state.fitSettings = {
      damping: state.defaultFitSettings.damping.value,
      errorTolerance: state.defaultFitSettings.errorTolerance.value,
      gradientDifference: state.defaultFitSettings.gradientDifference.value,
      maxIterations: state.defaultFitSettings.maxIterations.value,
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
  resetSelectionLimits(state) {
    // eslint-disable-next-line
    state.selectionLimits = [];
  },
  resetBrushSelection(state) {
    // eslint-disable-next-line
    state.brushSelection = [];
  },
  resetBrushFilt(state) {
    // eslint-disable-next-line
    state.brushFile = null;
  },
  reviseFitInitialValues(state, value) {
    // eslint-disable-next-line
    state.fitInitialValues = value;
  },
  updateFitTableResults(state, payload) {
    // eslint-disable-next-line
    state.fittedData = payload.fittedData;
    // eslint-disable-next-line
    state.fitError = payload.fitError;
    // eslint-disable-next-line
    state.fitInitialValues = payload.iv;
  },
  setBrushLimits(state, payload) {
    // eslint-disable-next-line
    state.brushSelection[0] = payload.scale(payload.limits[0]);
    // eslint-disable-next-line
    state.brushSelection[1] = payload.scale(payload.limits[1]);
  },
  setBrushSelection(state, value) {
    // eslint-disable-next-line
    state.brushSelection = value;
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
};
