import { setXScale, setYScale, resetScales } from '../../shared/mutations/scales';
import updateFilters from '../../shared/mutations/updateFilters';
import { normalizeData, resetNormalizedData } from '../../shared/mutations/normalizeData';
import { combineData, removeCombinedData, addCombinedData, resetCombinedData } from '../../shared/mutations/combineData';
import { setXField, setYField } from '../../shared/mutations/fields';
import removePoint from '../../shared/mutations/removePoint';

export default {
  setXScale,
  setYScale,
  resetScales,
  updateFilters,
  setXField,
  setYField,
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
