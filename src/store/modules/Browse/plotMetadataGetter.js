// getter for TAS and POWDER to grab metadata related to curve being plotted
export default (state) => {
  if (!state.selectedData.length) return [];

  return state.selectedData[0].metadata;
};
