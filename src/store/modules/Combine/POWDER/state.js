import _ from 'lodash';

import state from '../state';

import defaultSettings from '../combineSettings';

const statePOWDER = _.cloneDeep(state);

statePOWDER.filesSelected = [];
statePOWDER.defaultSettings = JSON.parse(JSON.stringify(defaultSettings));
statePOWDER.tolerance = defaultSettings.tolerance.value;
statePOWDER.field = {
  x: '2theta',
  y: 'node',
};

export default statePOWDER;
