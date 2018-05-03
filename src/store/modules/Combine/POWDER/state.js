import _ from 'lodash';

import state from '../state';

import combineSettings from '../combineSettings';

const defaultSettings = _.cloneDeep(combineSettings);
defaultSettings.tolerance.value = 0.05;

const statePOWDER = _.cloneDeep(state);

statePOWDER.filesSelected = [];
statePOWDER.defaultSettings = defaultSettings;
statePOWDER.tolerance = defaultSettings.tolerance.value;
statePOWDER.field = {
  x: '2theta',
  y: 'anode',
};

statePOWDER.anodesToExclude = [];
statePOWDER.normalizeByVCorr = {};
statePOWDER.isNormalizeByGap = false;
statePOWDER.normalizeByMonitor = 20000;

export default statePOWDER;
