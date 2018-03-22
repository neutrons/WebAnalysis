// import storeCombinedData from '../../shared/actions/storeCombinedData';
import deletePoint from '../../shared/actions/deletePoint';
import updateFilesSelected from '../../shared/actions/updateFilesSelectedTASCombine';
import fetchData from '../../shared/actions/fetchData';
import readData from '../../shared/actions/readData';
import parseData from '../../shared/actions/parseTAS';
import { setYField, setXField } from '../../shared/actions/fields';
import { setXScale, setYScale, resetScales } from '../../shared/actions/scales';
import { normalizeData, resetNormalizedData } from '../../shared/actions/normalizeData';
import { combineData, removeCombinedData, addCombinedData, resetCombinedData, storeCombinedData } from '../../shared/actions/combineData';
import resetAll from '../../shared/actions/resetAll';

export default {
  deletePoint,
  updateFilesSelected,
  fetchData,
  readData,
  parseData,
  setYField,
  setXField,
  setXScale,
  setYScale,
  resetScales,
  resetNormalizedData,
  normalizeData,
  combineData,
  removeCombinedData,
  addCombinedData,
  resetCombinedData,
  storeCombinedData,
  resetAll,
};
