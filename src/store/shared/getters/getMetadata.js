export default (state) => {
  if (!state.filesSelected.length) return null;

  const obj = {};
  state.selectedData.forEach((d) => {
    // eslint-disable-next-line
    obj[d.filename] = [...d.metadata];
  });

  return obj;
};
