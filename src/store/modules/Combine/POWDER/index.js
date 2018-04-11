import _ from 'lodash';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: _.cloneDeep(state),
  getters,
  actions,
  mutations,
};
