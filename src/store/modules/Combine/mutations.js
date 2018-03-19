import * as d3 from 'd3';

import { setXScale, setYScale, resetScales } from '../../shared/mutations/scales';
import updateFilters from '../../shared/mutations/updateFilters';
import { normalizeData, resetNormalizeData } from '../../shared/mutations/normalizeData';
import { combineData, removeCombineData, addCombinedData } from '../../shared/mutations/combineData';
import { setXField, setYField } from '../../shared/mutations/fields';
import removePoint from '../../shared/mutations/removePoint';
import setCurrentData from '../../shared/mutations/setCurrentDataTAS';

export default {
  setXScale,
  setYScale,
  resetScales,
  updateFilters,
  setXField,
  setYField,
  normalizeData,
  resetNormalizeData,
  combineData,
  removeCombineData,
  addCombinedData,
  removePoint,
  setCurrentData,
  updateFilesToAdd(state, selected) {
    const keys = [];

    state.filesToAdd.forEach((key) => {
      if (selected.indexOf(key) === -1) {
        keys.push(key);
      }
    });

    // eslint-disable-next-line
    state.filesToAdd = selected;
    // eslint-disable-next-line
    state.filesSelected.add = selected;
  },
  updateFilesToSubtract(state, selected) {
    const keys = [];

    state.filesToSubtract.forEach((key) => {
      if (selected.indexOf(key) === -1) {
        keys.push(key);
      }
    });

    // eslint-disable-next-line
    state.filesToSubtract = selected;
    // eslint-disable-next-line
    state.filesSelected.subtract = selected;
  },
  resetAll(state) {
    /* eslint-disable */
    state.filesToSubtract = [];
    state.filesToAdd = [];
    state.combinedData = [];
    state.selectedData = [];
    state.isNormalized = false;
    state.normalizeValue = state.defaultSettings.normalize.value;
    state.tolerance = state.defaultSettings.tolerance.value;
    state.field = {
      x: 'x',
      y: 'y',
    };
    state.normalizeField = 'time';
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
    state.isFieldChange = false;
    /* eslint-enable */
  },
  setNormalizeValue(state, value) {
    // eslint-disable-next-line
    state.normalizeValue = value;
  },
  setNormalizeField(state, value) {
    // eslint-disable-next-line
    state.normalizeField = value;
  },
  setTolerance(state, value) {
    // eslint-disable-next-line
    state.tolerance = value;
  },
};
