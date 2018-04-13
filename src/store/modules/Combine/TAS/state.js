import _ from 'lodash';

import state from '../state';

import defaultSettings from '../combineSettings';

const stateTAS = _.cloneDeep(state);

stateTAS.filesToAdd = [];
stateTAS.filesToSubtract = [];
stateTAS.filesSelected = {
  add: [],
  subtract: [],
};

stateTAS.field = {
  x: 'pt',
  y: 'detector',
};

stateTAS.defaultSettings = JSON.parse(JSON.stringify(defaultSettings));
stateTAS.normalizeValue = defaultSettings.normalize.value;
stateTAS.normalizeField = defaultSettings.normalize.field;
stateTAS.tolerance = defaultSettings.tolerance.value;
stateTAS.normalizeOptions = [
  'time',
  'detector',
  'mcu',
  'monitor',
];

export default stateTAS;
