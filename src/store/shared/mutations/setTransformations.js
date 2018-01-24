export default (state, payload) => {
  // eslint-disable-next-line
  state.transformations = {
    x: payload.x,
    y: payload.y,
  };
};
