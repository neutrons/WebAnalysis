export const resetBrushSelection = (state) => {
  // eslint-disable-next-line
  state.brushSelection = [];
};

export const setBrushLimits = (state, payload) => {
  // eslint-disable-next-line
  state.brushSelection[0] = payload.scale(payload.limits[0]);
  // eslint-disable-next-line
  state.brushSelection[1] = payload.scale(payload.limits[1]);
};

export const setBrushSelection = (state, value) => {
  // eslint-disable-next-line
  state.brushSelection = value;
};

