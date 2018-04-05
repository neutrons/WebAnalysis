import _ from 'lodash';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

// Import Modules
import Browse from '../Browse/POWDER';
import Fit from '../Fit/POWDER';

export default {
  namespaced: true,
  state,
  modules: {
    Browse: _.cloneDeep(Browse),
    Fit: _.cloneDeep(Fit),
  },
  getters,
  actions,
  mutations,
};
