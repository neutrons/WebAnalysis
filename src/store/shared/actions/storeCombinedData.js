import _ from 'lodash';

export default ({ state, commit }, payload) => {
  const filename = payload.name;
  const data = _.cloneDeep(state.combinedData);
  const tags = ['combine'];
  const defaultFields = { ...state.field };
  const metadata = [];
  const group = payload.group;
  // convert point name to new filename
  data.forEach((point) => {
    point.name = filename; // eslint-disable-line
  });

  const obj = {
    filename,
    data: {
      filename,
      defaultFields,
      metadata,
      data,
    },
  };

  // add combine name to list
  commit('addCombinedData', { filename, loadType: 'combine', tags });
  commit('removeCombineData');
  // to commit mutation from another module do
  commit(`${group}/storeData`, obj, { root: true });
};
