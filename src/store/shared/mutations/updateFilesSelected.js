export default (state, selected) => {
  const keys = [];

  state.filesSelected.forEach((key) => {
    if (selected.indexOf(key) === -1) {
      keys.push(key);
    }
  });
  // eslint-disable-next-line
  state.deleteKeys = keys;
  // now update new list
  // eslint-disable-next-line
  state.filesSelected = selected;
};
