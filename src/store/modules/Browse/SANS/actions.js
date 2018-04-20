import parseData from '../../../shared/actions/parseSANS1D';
import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import setCurrentData from '../../../shared/actions/setCurrentData';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelected;
actions.parseData = parseData;
actions.setCurrentData = setCurrentData;

export default actions;
