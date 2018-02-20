import Vue from 'vue';

export default (state, payload) => {
  if (payload.loadType === 'fetched') {
    Vue.set(state.fetched[payload.filename], 'tags', payload.tags);
  } else {
    Vue.set(state.uploaded[payload.filename], 'tags', payload.tags);
  }
};
