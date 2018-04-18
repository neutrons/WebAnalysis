import _ from 'lodash';

import actions from '../actions';

import updateFilesSelected from '../../../shared/actions/updateFilesSelectedTASCombine';
import parseData from '../../../shared/actions/parseTAS';
import { setYField, setXField } from '../../../shared/actions/fields';

const tasActions = _.cloneDeep(actions);

tasActions.updateFilesSelected = updateFilesSelected;
tasActions.parseData = parseData;
tasActions.setYField = setYField;
tasActions.setXField = setXField;

tasActions.combineData = async ({ state, commit }, value) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    if (!value.length) {
      commit('resetCombinedData');
      reject('No data to combine');
    }

    try {
      // pre-format data before combining it
      const tempData = [];

      state.selectedData.forEach((item) => {
        let t;
        if (item.type === 'subtract') {
          t = _.cloneDeep(item).dataTransformed.map((d) => {
            // eslint-disable-next-line
            d[yField] *= -1;
            return d;
          });
        } else {
          t = _.cloneDeep(item.dataTransformed);
        }

        tempData.push(t);
      });

      commit('combineData', { data: tempData, isError: true });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
export default tasActions;
