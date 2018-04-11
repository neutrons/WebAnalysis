import state from '../state';

import defaultSettings from '../combineSettings';

state.filesToAdd = [];
state.filesToSubtract = [];
state.filesSelected = {
  add: [],
  subtract: [],
};

state.field = {
  x: 'pt',
  y: 'detector',
};

state.defaultSettings = JSON.parse(JSON.stringify(defaultSettings));
state.normalizeValue = defaultSettings.normalize.value;
state.normalizeField = defaultSettings.normalize.field;
state.tolerance = defaultSettings.tolerance.value;
state.normalizeOptions = [
  'time',
  'detector',
  'mcu',
  'monitor',
];

export default state;
