import parseData from '../../../shared/actions/parseTAS';
import updateFilesSelectedTAS from '../../../shared/actions/updateFilesSelectedTAS';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelectedTAS;
actions.parseData = parseData;

export default actions;
