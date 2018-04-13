import _ from 'lodash';

import actions from '../actions';

import updateFilesSelected from '../../../shared/actions/updateFilesSelectedTASCombine';
import parseData from '../../../shared/actions/parseTAS';
import { setYField, setXField } from '../../../shared/actions/fields';
import { normalizeData, resetNormalizedData } from '../../../shared/actions/normalizeData';

const tasActions = _.cloneDeep(actions);

tasActions.updateFilesSelected = updateFilesSelected;
tasActions.parseData = parseData;
tasActions.setYField = setYField;
tasActions.setXField = setXField;
tasActions.normalizeData = normalizeData;
tasActions.resetNormalizedData = resetNormalizedData;

export default tasActions;
