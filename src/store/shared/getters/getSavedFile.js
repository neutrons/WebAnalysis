import _ from 'lodash';

export default state => (file) => {
  const temp = state.saved[file];

  if (temp === undefined) {
    return '999';
  }

  return _.cloneDeep(temp);
};
