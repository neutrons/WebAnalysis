import getters from '../getters';

import getFields from '../../../shared/getters/getFields';
import getExtent from '../../../shared/getters/getExtent';
import isDefaultFieldsDifferent from '../../../shared/getters/isDefaultFieldsDifferent';

getters.mergedFiles = (state) => {
  const temp = [...state.filesSelected.add].concat([...state.filesSelected.subtract]);
  return temp;
};

getters.getFields = getFields;
getters.getExtent = getExtent;
getters.isDefaultFieldsDifferent = isDefaultFieldsDifferent;

export default getters;
