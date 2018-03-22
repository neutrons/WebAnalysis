import resetFitConfiguration from '../../shared/actions/resetFitConfiguration';
import updateFitDataResults from '../../shared/actions/updateFitDataResults';
import deletePoint from '../../shared/actions/deletePoint';
import fetchData from '../../shared/actions/fetchData';
import readData from '../../shared/actions/readData';
import { setXScale, setYScale, resetScales } from '../../shared/actions/scales';
import { resetBrushSelection, setBrushLimits, setBrushSelection } from '../../shared/actions/selections';
import { addToSelect, updateSelectAtIndex, removeSelectAtIndex,
  updateInitialValue, addCoefficientValue, removeInitialValues,
  addInitialValues, setSelectValid, setSelectEquation,
  setCoefficientConstant, updateEquationEditInitialValues, setEquationEditSelect } from '../../shared/actions/equationEditorActions';
import setPreviousFit from '../../shared/actions/setPreviousFit';
import setFilteredData from '../../shared/actions/setFilteredData';
import resetFittedData from '../../shared/actions/resetFittedData';
import resetAll from '../../shared/actions/resetAll';

export default {
  resetFitConfiguration,
  updateFitDataResults,
  deletePoint,
  fetchData,
  readData,
  setXScale,
  setYScale,
  resetScales,
  resetBrushSelection,
  setBrushLimits,
  setBrushSelection,
  addToSelect,
  updateSelectAtIndex,
  removeSelectAtIndex,
  updateInitialValue,
  addCoefficientValue,
  removeInitialValues,
  addInitialValues,
  setSelectValid,
  setSelectEquation,
  setCoefficientConstant,
  updateEquationEditInitialValues,
  setEquationEditSelect,
  setPreviousFit,
  setFilteredData,
  resetFittedData,
  resetAll,
};
