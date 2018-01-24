import Vue from 'vue';

export default (state, payload) => {
  const filename = payload.filename;
  const data = payload.data;

  Vue.set(state.saved, filename, data);
};
