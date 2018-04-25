import _ from 'lodash';
import findPointIndex from '../../../assets/js/findPointIndex';

export default ({ state, commit, getters }, payload) =>
  new Promise((resolve, reject) => {
    const name = payload.name;
    const group = payload.group;
    const fields = state.field;
    const tempData = _.cloneDeep(getters.getPreparedData);
    const index = findPointIndex(payload, tempData, fields);

    // match index to file
    if (index !== null) {
      try {
        commit('removePoint', { name, index });
        commit(`${group}/removeSavedPoint`, { name, index }, { root: true });

        resolve(true);
      } catch (error) {
        reject('Cannot delete point.');
      }
    } else {
      reject('Cannot delete point.');
    }
  });
