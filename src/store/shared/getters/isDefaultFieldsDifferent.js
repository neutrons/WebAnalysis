// function to check if default axes for TAS curves are different

export default (state) => {
  if (state.selectedData.length > 1) {
    const defX1 = state.selectedData[0].defaultFields.x;
    const defY1 = state.selectedData[0].defaultFields.y;
    const end = state.selectedData.length - 1;
    const defX2 = state.selectedData[end].defaultFields.x;
    const defY2 = state.selectedData[end].defaultFields.y;

    if (defX1 !== defX2 || defY1 !== defY2) {
      const msg = `Warning! The default axes are different from first curve.
       Default axis are 'def_x = ${defX2}' and 'def_y = ${defY2}'`;
      return msg;
    }
  }

  return true;
};
