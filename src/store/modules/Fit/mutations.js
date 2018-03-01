import updateFilesSelected from '../../shared/mutations/updateFilesSelected';
import updateFilters from '../../shared/mutations/updateFilters';
import updateFileToFit from '../../shared/mutations/updateFileToFit';
import setPreviousFit from '../../shared/mutations/setPreviousFit';
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
import setFitList from '../../shared/mutations/setFitList';
import updateFitTableResults from '../../shared/mutations/updateFitTableResults';
import { changeFields } from '../../shared/mutations/fields';
import setFilteredData from '../../shared/mutations/setFilteredData';
import toggleIsFitting from '../../shared/mutations/toggleIsFitting';

export default {
  updateFilesSelected,
  updateFilters,
  updateFileToFit,
  setPreviousFit,
  setXScale,
  setYScale,
  resetScales,
  setXTransformation,
  setYTransformation,
  setTransformations,
  resetTransformations,
  transformData,
  setFitList,
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
  updateFitTableResults,
  changeFields,
  setFilteredData,
  toggleIsFitting,
};
