import _ from 'lodash';

import actions from '../actions';

import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import parseData from '../../../shared/actions/parseTAS';

const powderActions = _.cloneDeep(actions);
powderActions.updateFilesSelected = updateFilesSelected;
powderActions.parseData = parseData;

powderActions.normalizeData = ({ state }) => {
  state.isNormalized = true; // eslint-disable-line
};

powderActions.resetNormalizedData = ({ state }) => {
  state.isNormalized = false; // eslint-disable-line
};

export default powderActions;
