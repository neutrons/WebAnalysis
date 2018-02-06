import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

// Import modules
import Stitch from '../Stitch';
import SANS2D from './SANS2D';
import Browse from '../Browse';

export default {
  namespaced: true,
  modules: {
    Stitch,
    Browse,
    SANS2D,
  },
  state,
  getters,
  actions,
  mutations,
};
