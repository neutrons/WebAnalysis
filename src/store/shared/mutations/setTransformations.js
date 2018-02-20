import Vue from 'vue';

export default (state, payload) => {
  // eslint-disable-next-line
  state.transformations = {
    x: payload.x,
    y: payload.y,
  };
  Vue.set(state.label, 'x', `q = ${payload.x}`);
  Vue.set(state.label, 'y', `I(q) = ${payload.y}`);
};
