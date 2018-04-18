import _ from 'lodash';

import actions from '../actions';

import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import parseData from '../../../shared/actions/parseTAS';

const powderActions = _.cloneDeep(actions);
powderActions.updateFilesSelected = updateFilesSelected;
powderActions.parseData = parseData;

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

powderActions.combineData = async ({ state, commit }, value) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    if (!value.length) {
      commit('resetCombinedData');
      reject('No data to combine');
    }

    try {
      // pre-format data before combining it
      const tempData = [];

      state.selectedData.forEach((item) => {
        item.dataTransformed.forEach((curve) => {
          tempData.push(_.cloneDeep(curve.values));
        });
      });

      commit('combineData', { data: tempData, isError: false });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export default powderActions;
