export default {
  setCurrentData({ commit, getters }, chosenData) {
    const currentConfiguration = getters.getCurrentConfiguration;
    commit('setCurrentData', { currentConfiguration, chosenData });
  },
};
