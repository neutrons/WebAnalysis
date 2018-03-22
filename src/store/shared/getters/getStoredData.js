import _ from 'lodash';

export default state => (files) => {
  const data = [];
  const notFound = [];
  const keys = Object.keys(state.saved);

  files.forEach((file) => {
    if (keys.indexOf(file) === -1) {
      notFound.push(file);
    } else {
      data.push({ ...state.saved[file] });
    }
  });

  const result = [
    data,
    notFound,
  ];

  return _.cloneDeep(result);
};
