export default (state, payload) => {
  state.fetched = Object.assign({}, payload); // eslint-disable-line
};
