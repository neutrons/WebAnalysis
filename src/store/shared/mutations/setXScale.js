export default (state, x) => {
  // eslint-disable-next-line
  state.plotScale.x = {
    label: x,
    value: state.scale.x[x].copy(),
  };
};
