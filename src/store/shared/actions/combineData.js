import _ from 'lodash';

export const combineData = async ({ commit }, value) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    if (!value.length) {
      commit('resetCombinedData');
      reject('No data to combine');
    }

    try {
      commit('combineData', value);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeCombinedData = async ({ commit }) => {
  commit('removeCombinedData');
  return Promise.resolve(true);
};

export const addCombinedData = async ({ commit }, payload) => {
  commit('addCombinedData', payload);
  return Promise.resolve(true);
};

export const resetCombinedData = async ({ commit }) => {
  commit('resetCombinedData');
  return Promise.resolve(true);
};

export const storeCombinedData = async ({ state, commit }, payload) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      const filename = payload.name;
      const data = _.cloneDeep(state.combinedData);
      const tags = ['combine'];
      const defaultFields = { ...state.field };

      let date = new Date();
      date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

      const metadata = [
        `date = ${date}`,
        `def_x = ${defaultFields.x}`,
        `def_y = ${defaultFields.y}`,
      ];

      const group = payload.group;
      // convert point name to new filename
      data.forEach((point) => {
        point.name = filename; // eslint-disable-line
      });

      const obj = {
        filename,
        defaultFields,
        metadata,
        data,
      };

      // add combine name to list
      commit('addCombinedData', { filename, loadType: 'combine', tags });
      commit('removeCombinedData');
      commit(`${group}/storeData`, [obj], { root: true });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};
