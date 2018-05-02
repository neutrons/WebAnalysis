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

tasActions.combineData = async ({ state, commit }, dataToCombine) => {
  const yField = state.field.y;

  function getCurveData(d, name) {
    for (let i = 0, length = d.length; i < length; i += 1) {
      if (d[i].key === name) {
        return d[i].values;
      }
    }

    return null;
  }

  return new Promise((resolve, reject) => {
    if (!dataToCombine.length) {
      commit('resetCombinedData');
      reject('No data to combine');
    }

    try {
      // pre-format data before combining it
      const tempData = [];

      state.selectedData.forEach((item) => {
        let t;

        if (item.type === 'subtract') {
          t = _.cloneDeep(getCurveData(dataToCombine, item.filename))
            .map((point) => {
              point[yField] *= -1; // eslint-disable-line

              return point;
            });
        } else {
          t = _.cloneDeep(getCurveData(dataToCombine, item.filename));
        }

        tempData.push(t);
      });

      commit('combineData', { data: _.cloneDeep(tempData), group: 'TAS' });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
export default tasActions;
