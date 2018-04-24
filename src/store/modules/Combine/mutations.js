import { setXScale, setYScale, resetScales } from '../../shared/mutations/scales';
import updateFilters from '../../shared/mutations/updateFilters';
import { combineData, removeCombinedData, addCombinedData, resetCombinedData } from '../../shared/mutations/combineData';
import removePoint from '../../shared/mutations/removePoint';
import setTolerance from '../../shared/mutations/setTolerance';

export default {
  setXScale,
  setYScale,
  resetScales,
  updateFilters,
  combineData,
  removeCombinedData,
  addCombinedData,
  resetCombinedData,
  removePoint,
  setTolerance,
};
