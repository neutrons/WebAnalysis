import { setXScale, setYScale, resetScales } from '../../shared/mutations/scales';
import updateFilters from '../../shared/mutations/updateFilters';
import { normalizeData, resetNormalizedData } from '../../shared/mutations/normalizeData';
import { combineData, removeCombinedData, addCombinedData, resetCombinedData } from '../../shared/mutations/combineData';
import removePoint from '../../shared/mutations/removePoint';

export default {
  setXScale,
  setYScale,
  resetScales,
  updateFilters,
  normalizeData,
  resetNormalizedData,
  combineData,
  removeCombinedData,
  addCombinedData,
  resetCombinedData,
  removePoint,
  setTolerance(state, value) {
    // eslint-disable-next-line
    state.tolerance = value;
  },
};
