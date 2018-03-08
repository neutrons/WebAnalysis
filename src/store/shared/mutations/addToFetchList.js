import Vue from 'vue';

export default (state, payload) => {
  const key = payload.key;
  const file = payload.file;
  Vue.set(state.fetched, key, file);

  if (state.colorDomain.indexOf(key) === -1) {
    state.colorDomain.push(key);
  }
};
