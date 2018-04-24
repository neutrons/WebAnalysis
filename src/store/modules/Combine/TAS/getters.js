import _ from 'lodash';

import getter from '../getters';

import isDefaultFieldsDifferent from '../../../shared/getters/isDefaultFieldsDifferent';
import getPreparedData from '../../../shared/getters/getPreparedData';

const tasGetters = _.cloneDeep(getter);

// merged files is to produce one list for
// files to be added and subtracted
tasGetters.mergedFiles = (state) => {
  const temp = [...state.filesSelected.add].concat([...state.filesSelected.subtract]);
  return temp;
};

tasGetters.getMetadata = (state, getters) => {
  if (!getters.mergedFiles.length) return null;

  const obj = {};
  state.selectedData.forEach((d) => {
    if (typeof d.metadata !== 'undefined' && d.metadata.length > 0) {
      obj[d.filename] = [...d.metadata];
    }
  });

  return obj;
};

tasGetters.isDefaultFieldsDifferent = isDefaultFieldsDifferent;
tasGetters.getPreparedData = getPreparedData;

export default tasGetters;
