import _ from 'lodash';

export default {
  setCurrentData(state, value) {
    if (value.length === 0) {
      state.browseData = []; // eslint-disable-line
    } else {
      if (typeof value[0].defaultFields !== 'undefined') {
        state.field = { ...value[0].defaultFields }; // eslint-disable-line
      }

      state.browseData = _.cloneDeep(value[0]); // eslint-disable-line
    }
  },
  resetAll(state) {
    /* eslint-disable */
    state.browseData = [];
    state.filesSelected = [];
    /* eslint-enable */
  },
  removePoint(state, payload) {
    const index = payload.index;
    state.browseData.data.splice(index, 1);
  },
  updateFilesSelected(state, payload) {
    state.filesSelected = payload[0]; // eslint-disable-line
  },
};
