import _ from 'lodash';

export default (state, getters) => {
  const temp = [];
  getters.getPreparedData.forEach((el) => {
    if (el.key === state.fileToFit) temp.push(_.cloneDeep(el.values));
  });
  return temp[0] || [];
};
