import Vue from 'vue';
import Vuex from 'vuex';
import SANS1D from './modules/SANS1D/index';
import SANS2D from './modules/SANS2D/index';
import Stitch from './modules/Stitch/index';
import TAS from './modules/TAS/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    SANS1D,
    SANS2D,
    Stitch,
    TAS,
  },
});
