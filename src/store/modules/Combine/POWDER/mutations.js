import * as d3 from 'd3';
import _ from 'lodash';

import detectVCorrFilename from './detectVCorrFilename';

import mutations from '../mutations';
import updateFilesSelected from '../../../shared/mutations/updateFilesSelected';

const powderMutations = _.cloneDeep(mutations);

powderMutations.updateFilesSelected = updateFilesSelected;

powderMutations.setCurrentData = (state, payload) => {
  const chosenData = payload.data;
  const gapsData = payload.gaps;

  const filteredData = [];

  for (let i = 0, length = chosenData.length; i < length; i += 1) {
    const metadata = [...chosenData[i].metadata];
    const filename = chosenData[i].filename;
    let data = _.cloneDeep(chosenData[i].data);
    const vcorr = detectVCorrFilename(data);
    let gapSum = 0;

    // Get anode names
    const nodeNames = Object.keys(data[0])
      .filter(field => /^anode\d+$/.exec(field) !== null);

    // Generate curve data per anode
    data = nodeNames.map((anode, index) => {
      // With each iteration of anode, we add the cumulative of gaps data to 2theta
      // So Anode1 is gaps[0] + 2theta
      // Anode2 is gaps[0] + gaps[1] + 2theta
      // ... Anode(N) is gaps[0] + ... + gaps[n] + 2theta
      // We only use the first column of gaps data (this is what user told us)
      if (gapsData.length > 0) { // make sure gap data exists
        gapSum += gapsData[index][0];
      }

      return {
        filename,
        anode,
        values: data.map(point => ({
          '2theta': point['2theta'] + gapSum, // add cumulative gaps data to 2theta
          anode: point[anode],
          name: `${filename}_${anode}`,
          error: point[anode] < 0 ? 0 : Math.sqrt(point[anode]),
        })),
      };
    });

    filteredData.push({
      metadata,
      filename,
      vcorr,
      data, // keep a clean version of data when reverting transformed data
      dataTransformed: _.cloneDeep(data),
    });
  }

  // Then set the filtered data
  state.selectedData = filteredData; // eslint-disable-line
};

powderMutations.setNormalizeValue = (state, value) => {
  // eslint-disable-next-line
  state.normalizeValue = value;
};

powderMutations.setNormalizeField = (state, value) => {
  // eslint-disable-next-line
  state.normalizeField = value;
};

powderMutations.resetAll = (state) => {
  /* eslint-disable */
  state.filesSelected = [];
  state.combinedData = [];
  state.selectedData = [];
  state.isNormalized = false;
  state.tolerance = state.defaultSettings.tolerance.value;
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.isFieldChange = false;
  state.anodesToExclude = [];
  state.normalizeByVCorr = [];
  state.isNormalizeByGap = false;
  /* eslint-enable */
};

powderMutations.setAnodesToExclude = (state, values) => {
  state.anodesToExclude = values; // eslint-disable-line
};

powderMutations.resetAnodesToExclude = (state, values) => {
  state.anodesToExclude = values; // eslint-disable-line
};

powderMutations.setNormalizeByVCorr = (state, value) => {
  state.normalizeByVCorr = value; // eslint-disable-line
};

powderMutations.setIsNormalizeByGap = (state, value) => {
  state.isNormalizeByGap = value; // eslint-disable-line
};

powderMutations.normalizeData = (state) => {
  state.isNormalized = true; // eslint-disable-line

  // To Normalize Powder Data divide each plotted curve by vcorr data
  state.selectedData.forEach((curve) => {
    // Grab transformed data
    const transformedData = curve.dataTransformed;

    // Loop through each anode value and divide by vcorr matching anode number to vcorr index
    transformedData.forEach((anode) => {
      // grab anode number and convert to type of number
      // then subtract by 1 to get appropriate index for VCorr values
      let anodeIndex = +anode.anode.replace('anode', '');
      anodeIndex -= 1;

      const normalizeValue = state.normalizeByVCorr[anodeIndex];

      anode.values = anode.values.map((point) => { // eslint-disable-line
        const normalizedPoint = { ...point };

        // calculate normalized error
        // | normalized_Y | * SQRT( (errY / Y)^2 + (normalized_value_error / normalized_value)^2 )
        const oldY = normalizedPoint.anode;
        const normY = oldY / normalizeValue;
        const errorY = point.error;
        const normValueError = Math.sqrt(normalizeValue);
        // eslint-disable-next-line
        const temp = Math.abs(normY) * Math.sqrt(Math.pow(errorY / oldY, 2) + Math.pow(normValueError / normalizeValue, 2));
        const newError = isFinite(temp) ? temp : 0; // check for invalid normalized errors

        normalizedPoint.anode = normY;
        normalizedPoint.error = newError;

        return normalizedPoint;
      });
    });
  });
};

powderMutations.resetNormalizedData = (state) => {
  state.isNormalized = false; // eslint-disable-line

  // Loop through selected data and reset transformed data back to being non-normalized
  state.selectedData.forEach((curve) => {
     curve.dataTransformed = _.cloneDeep(curve.data); // eslint-disable-line
  });

  /* eslint-disable */
  state.isNormalized = false;
  state.combinedData = [];
  state.tolerance = state.defaultSettings.tolerance.value;
  /* eslint-enable */
};

export default powderMutations;
