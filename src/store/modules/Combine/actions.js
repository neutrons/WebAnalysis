import deletePoint from '../../shared/actions/deletePoint';
import fetchData from '../../shared/actions/fetchData';
import readData from '../../shared/actions/readData';
import { setXScale, setYScale, resetScales } from '../../shared/actions/scales';
import { removeCombinedData, addCombinedData, resetCombinedData, storeCombinedData } from '../../shared/actions/combineData';
import { normalizeData, resetNormalizedData } from '../../shared/actions/normalizeData';
import resetAll from '../../shared/actions/resetAll';

export default {
  deletePoint,
  fetchData,
  readData,
  setXScale,
  setYScale,
  resetScales,
  normalizeData,
  resetNormalizedData,
  removeCombinedData,
  addCombinedData,
  resetCombinedData,
  storeCombinedData,
  resetAll,
};
