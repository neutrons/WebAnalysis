import parseData from '../../../shared/actions/parseTAS';
import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import setCurrentData from '../../../shared/actions/setCurrentData';
import { setYField, setXField } from '../../../shared/actions/fields';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelected;
actions.setYField = setYField;
actions.setXField = setXField;
actions.parseData = parseData;
actions.setCurrentData = setCurrentData;

export default actions;
