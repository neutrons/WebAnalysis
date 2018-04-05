import parseData from '../../../shared/actions/parseTAS';
import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import { setYField, setXField } from '../../../shared/actions/fields';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelected;
actions.setYField = setYField;
actions.setXField = setXField;
actions.parseData = parseData;

export default actions;
