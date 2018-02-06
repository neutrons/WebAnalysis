import _ from 'lodash';
import * as d3 from 'd3';
import swapFields from '../../../assets/js/swapFields';

import addFetchFiles from '../../shared/mutations/addFetchFiles';
import addUploadFiles from '../../shared/mutations/addUploadFiles';
import updateFilesSelected from '../../shared/mutations/updateFilesSelected';
import updateFilters from '../../shared/mutations/updateFilters';
import updateFileToFit from '../../shared/mutations/updateFileToFit';
import setPreviousFit from '../../shared/mutations/setPreviousFit';
import storeData from '../../shared/mutations/storeData';
import setXScale from '../../shared/mutations/setXScale';
import setYScale from '../../shared/mutations/setYScale';
import resetScales from '../../shared/mutations/resetScales';
import setXTransformation from '../../shared/mutations/setXTransformation';
import setYTransformation from '../../shared/mutations/setYTransformation';
import setTransformations from '../../shared/mutations/setTransformations';
import resetTransformations from '../../shared/mutations/resetTransformations';
import transformData from '../../shared/mutations/transformData';
import { setFitDamping, setFitGradient, setFitIterations, setFitError, resetFitSettings } from '../../shared/mutations/setFitSettings';
import { setFitEquation, updateFitEquation } from '../../shared/mutations/fitEquation';
import { removeFitInitialValue, addFitInitialValue, setFitInitialValues, reviseFitInitialValues } from '../../shared/mutations/initialValues';
import { resetBrushSelection, setBrushLimits, setBrushSelection } from '../../shared/mutations/selections';
import setFitType from '../../shared/mutations/setFitType';
import setFitList from '../../shared/mutations/setFitList';
import updateTags from '../../shared/mutations/updateTags';
import updateFitTableResults from '../../shared/mutations/updateFitTableResults';
import { setXField, setYField } from '../../shared/mutations/fields';
import setFilteredData from '../../shared/mutations/setFilteredData';
import toggleIsFitting from '../../shared/mutations/toggleIsFitting';

export default {
  addFetchFiles,
  addUploadFiles,
  updateFilesSelected,
  updateFilters,
  updateFileToFit,
  setPreviousFit,
  storeData,
  setXScale,
  setYScale,
  resetScales,
  setXTransformation,
  setYTransformation,
  setTransformations,
  resetTransformations,
  transformData,
  setFitList,
  setFitType,
  setFitDamping,
  setFitGradient,
  setFitIterations,
  setFitError,
  resetFitSettings,
  setFitEquation,
  updateFitEquation,
  removeFitInitialValue,
  addFitInitialValue,
  setFitInitialValues,
  reviseFitInitialValues,
  resetBrushSelection,
  setBrushLimits,
  setBrushSelection,
  updateTags,
  updateFitTableResults,
  setXField,
  setYField,
  setFilteredData,
  toggleIsFitting,
  setBrowseData(state, value) {
    // eslint-disable-next-line
    state.browseData = value;
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
    state.field = {
      x: 'pt',
      y: 'detector',
    };
    state.label = {
      x: 'q = x',
      y: 'I(q) = y',
    };
    state.deleteKeys = [];
    state.fittedData = [];
    state.filteredData = [];
    state.brushSelection = [];
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
