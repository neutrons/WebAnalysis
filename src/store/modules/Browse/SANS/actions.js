import parseData from '../../../shared/actions/parseSANS1D';
import updateFilesSelectedSANS from '../../../shared/actions/updateFilesSelectedSANS';
import actions from '../actions';

actions.updateFilesSelected = updateFilesSelectedSANS;
actions.parseData = parseData;

export default actions;
