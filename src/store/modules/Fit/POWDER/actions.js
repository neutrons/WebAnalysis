import parseData from '../../../shared/actions/parseTAS';
import updateFilesSelectedPOWDER from '../../../shared/actions/updateFilesSelectedPOWDER';
import { setYField, setXField } from '../../../shared/actions/fields';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelectedPOWDER;
actions.setYField = setYField;
actions.setXField = setXField;
actions.parseData = parseData;

export default actions;
