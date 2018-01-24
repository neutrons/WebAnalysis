import _ from 'lodash';

import getURLs from '../../shared/getters/getURLs';

export default {
  getSavedFile: state => (file) => {
    const temp = state.saved[file];

    if (temp === undefined) {
      return '999';
    }

    return { data: _.cloneDeep(temp), filename: file };
  },
  getURLs,
  isFilePlotted: state => state.filesSelected !== null,
};
