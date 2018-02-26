import * as d3 from 'd3';
import _ from 'lodash';
import setXScale from '../../shared/mutations/setXScale';
import setYScale from '../../shared/mutations/setYScale';
import resetScales from '../../shared/mutations/resetScales';
import updateFilters from '../../shared/mutations/updateFilters';
import swapFields from '../../../assets/js/swapFields';
import { setXField, setYField, changeFields } from '../../shared/mutations/fields';

export default {
  setXScale,
  setYScale,
  resetScales,
  updateFilters,
  changeFields,
  setXField,
  setYField,
  updateFilesToAdd(state, selected) {
    const keys = [];

    state.filesToAdd.forEach((key) => {
      if (selected.indexOf(key) === -1) {
        keys.push(key);
      }
    });
    // eslint-disable-next-line
    state.deleteKeys = keys;

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
    state.deleteKeys = keys;

    // eslint-disable-next-line
    state.filesToSubtract = selected;
    // eslint-disable-next-line
    state.filesSelected.subtract = selected;
  },
  resetAll(state) {
    /* eslint-disable */
    state.filesToSubtract = [];
    state.filesToAdd = [];
    state.combineData = [];
    state.selectedData = [];
    state.normalizeValue = state.defaultSettings.normalize.value;
    state.tolerance = state.defaultSettings.tolerance.value;
    state.field = {
      x: 'pt',
      y: 'detector',
    };
    state.normalizeField = 'time';
    state.plotScale = {
      x: { label: 'x', value: d3.scaleLinear() },
      y: { label: 'y', value: d3.scaleLinear() },
    };
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
  setCurrentData(state, chosenData) {
    const tempData = _.cloneDeep(chosenData);
    const tempSelect = [];

    for (let i = 0, len = tempData.length; i < len; i += 1) {
      const data = _.cloneDeep(tempData[i].data);
      const filename = tempData[i].filename;
      const metadata = [...tempData[i].metadata];
      const dataTransformed = swapFields(data, state.field);
      const type = state.filesToAdd.indexOf(filename) === -1 ? 'subtract' : 'add';

      tempSelect.push({
        data,
        dataTransformed,
        filename,
        metadata,
        type,
      });
    }

    // eslint-disable-next-line
    state.selectedData = tempSelect;
  },
};
