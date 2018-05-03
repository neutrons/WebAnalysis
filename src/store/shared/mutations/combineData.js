import Vue from 'vue';
import * as d3 from 'd3';

export const combineData = (state, payload) => {
  let tempData = payload.data;
  const group = payload.group;

  const xField = state.field.x;
  const yField = state.field.y;

  // flatten temp to 1D array
  tempData = tempData.reduce((a, b) => a.concat(b), []);

  // get min and max values for x domain
  const extent = d3.extent(tempData, d => d[xField]);

  // calculate numbe of bins
  const binCount = Math.ceil((extent[1] - extent[0]) / state.tolerance);

  // calculate binning threshold
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

    // get subset of data by current bin's min and max
    if (index !== end) {
      subset = tempData.filter(d => min <= d[xField] && d[xField] < max);
    } else {
      subset = tempData.filter(d => min <= d[xField] && d[xField] <= max);
    }

    if (subset.length) {
      // calculate cumulative sum for new y point value
      newY = subset.reduce((a, b) => a + b[yField], 0);

      // calculate cumulative sum for new error point value
      newError = subset.reduce((a, b) => a + b.error, 0);

      // If POWDER get calculate average
      if (group === 'POWDER') {
        const length = subset.length;
        const newYtmp = newY / length;
        newError = Math.abs(newYtmp) * Math.sqrt(Math.pow(newError / newY, 2) + Math.pow(Math.sqrt(length) / length, 2)); // eslint-disable-line

        newY = newYtmp;
      }

      /* eslint-disable */
      const newPoint = { ...subset[0] }; // just use first point in subset as a template for new point
      newPoint.error = newError;

      const matchKeys = [xField, yField, 'error'];
      newPoint[xField] = newX;
      newPoint[yField] = newY;

      // Some data files have many field other than x, y, and error
      // So loop through and replace with null since we didn't calculate for those values
      for (let key in newPoint) {
        if (matchKeys.indexOf(key) === -1) {
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

export const removeCombinedData = (state) => {
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

  // use Vue.set in order to watch for changes to original array
  Vue.set(state.storedCombined, filename, data);
};

export const resetCombinedData = (state) => {
  state.combinedData = []; // eslint-disable-line
};

