import parseData from '../../../shared/actions/parseSANS1D';
import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import actions from '../actions';

actions.updateFilesSelected = updateFilesSelected;
actions.parseData = parseData;

export default actions;
