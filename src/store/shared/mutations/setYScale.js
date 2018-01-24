export default (state, y) => {
  // eslint-disable-next-line
  state.plotScale.y = {
    label: y,
    value: state.scale.y[y].copy(),
  };
};
