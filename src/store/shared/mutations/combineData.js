import Vue from 'vue';
import _ from 'lodash';
import * as d3 from 'd3';

export const combineData = (state, value) => {
  if (!value.length) {
    state.combinedData = []; // eslint-disable-line
    return;
  }

  let tempData = [];
  const xField = state.field.x;
  const yField = state.field.y;

  state.selectedData.forEach((item) => {
    let t;
    if (item.type === 'subtract') {
      t = _.cloneDeep(item).dataTransformed.map((d) => {
        // eslint-disable-next-line
        d[yField] *= -1;
        return d;
      });
    } else {
      t = _.cloneDeep(item.dataTransformed);
    }

    tempData.push(t);
  });

  // flatten temp to 1D array
  tempData = tempData.reduce((a, b) => a.concat(b), []);

  const extent = d3.extent(tempData, d => d[xField]);
  const binCount = Math.ceil((extent[1] - extent[0]) / state.tolerance);
  const thresholds = d3.range(extent[0], extent[1], (extent[1] - extent[0]) / binCount);

  const histogram = d3.histogram()
    .domain(extent)
    .thresholds(thresholds);

  const bins = histogram(tempData);
  const end = bins.length - 1;
  const result = [];

  bins.forEach((bin, index) => {
    const min = bin.x0;
    const max = bin.x1;
    const newX = (max + min) / 2;
    let newY;
    let newError;
    let subset;

    if (index !== end) {
      subset = tempData.filter(d => min <= d[xField] && d[xField] < max);
    } else {
      subset = tempData.filter(d => min <= d[xField] && d[xField] <= max);
    }

    if (subset.length) {
      newY = subset.reduce((a, b) => a + b[yField], 0);
      newError = subset.reduce((a, b) => a + b.error, 0);

      /* eslint-disable */
      const newPoint = { ...subset[0] };
      newPoint[xField] = newX;
      newPoint[yField] = newY;
      newPoint.error = newError;

      for (let key in newPoint) {
        if ([xField, yField, 'error'].indexOf(key) === -1) {
          newPoint[key] = null;
        }
      }
      newPoint.name = 'combine';
      /* eslint-enable */
      result.push(newPoint);
    }
  });

  state.combinedData = result.sort((a, b) => a[xField] - b[xField]); // eslint-disable-line
};

export const removeCombineData = (state) => {
  state.combinedData = []; // eslint-disable-line
  state.tolerance = state.defaultSettings.tolerance.value; // eslint-disable-line
};

export const addCombinedData = (state, payload) => {
  const loadtype = 'combine';
  const filename = payload.filename;
  const tags = [...payload.tags];
  const data = {
    filename,
    loadtype,
    tags,
  };

  Vue.set(state.storedCombined, filename, data);
};

