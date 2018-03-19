import _ from 'lodash';

export default {
  setBrowseData(state, value) {
    if (typeof value.defaultFields !== 'undefined') {
      state.field = { ...value.defaultFields }; // eslint-disable-line
    }

    // eslint-disable-next-line
    state.browseData = _.cloneDeep(value);
  },
  resetAll(state) {
    /* eslint-disable */
    state.browseData = [];
    /* eslint-enable */
  },
  removePoint(state, payload) {
    const index = payload.index;
    state.browseData.data.splice(index, 1);
  },
};
