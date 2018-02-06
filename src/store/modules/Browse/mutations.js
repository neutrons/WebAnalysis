export default {
  setBrowseData(state, value) {
    // eslint-disable-next-line
    state.browseData = value;
  },
  resetAll(state) {
    /* eslint-disable */
    state.browseData = [];
    /* eslint-enable */
  },
};
