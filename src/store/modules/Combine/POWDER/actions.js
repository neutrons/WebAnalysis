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

powderActions.setAnodesToExclude = async ({ state, commit }, values) =>
  new Promise((resolve, reject) => {
    try {
      commit('setAnodesToExclude', values);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

powderActions.resetAnodesToExclude = async ({ commit, rootState }) =>
  new Promise((resolve, reject) => {
    try {
      const values = [...rootState.POWDER.normalizeFilesData.excludeDetectors];
      commit('resetAnodesToExclude', values);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export default powderActions;
