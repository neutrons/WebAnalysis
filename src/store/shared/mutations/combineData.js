import _ from 'lodash';

export const combineData = (state, value) => {
  if (!value.length) {
    state.combinedData = []; // eslint-disable-line
    return;
  }

  const result = [];
  let temp = [];
  state.selectedData.forEach((item) => {
    let t;
    if (item.type === 'subtract') {
      t = _.cloneDeep(item).dataTransformed.map((d) => {
        // eslint-disable-next-line
        d.y *= -1;
        return d;
      });
    } else {
      t = _.cloneDeep(item.dataTransformed);
    }

    temp.push(t);
  });

  // flatten temp to 1D array
  temp = temp.reduce((a, b) => a.concat(b), []);
  const length = temp.length;

  for (let i = 0; i < length; i += 1) {
    const d = temp[i];
    const min = d.x - state.tolerance;
    const max = d.x + state.tolerance;
    const subset = temp.filter(point => min <= point.x && point.x <= max);

    result.push({
      x: d.x,
      y: subset.reduce((a, b) => a + b.y, 0),
      error: subset.reduce((a, b) => a + b.error, 0),
      name: 'combine',
    });
  }

  state.combinedData = result.sort((a, b) => a.x - b.x); // eslint-disable-line
};

export const removeCombineData = (state) => {
  state.combinedData = []; // eslint-disable-line
  state.tolerance = state.defaultSettings.tolerance.value; // eslint-disable-line
};

