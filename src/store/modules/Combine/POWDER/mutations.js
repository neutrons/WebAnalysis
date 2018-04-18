import * as d3 from 'd3';
import _ from 'lodash';

import mutations from '../mutations';
import updateFilesSelected from '../../../shared/mutations/updateFilesSelected';

const powderMutations = _.cloneDeep(mutations);

powderMutations.updateFilesSelected = updateFilesSelected;

powderMutations.setCurrentData = (state, chosenData) => {
  const filteredData = [];

  for (let i = 0, length = chosenData.length; i < length; i += 1) {
    const metadata = [...chosenData[i].metadata];
    const filename = chosenData[i].filename;
    let data = _.cloneDeep(chosenData[i].data);

    // Get anode names
    const nodeNames = Object.keys(data[0])
      .filter(field => /^anode\d+$/.exec(field) !== null);

    // Generate curve data per anode
    data = nodeNames.map(anode => ({
      filename,
      anode,
      values: data.map(point => ({
        '2theta': point['2theta'],
        anode: point[anode],
        name: `${filename}_${anode}`,
      })),
    }));

    filteredData.push({
      metadata,
      filename,
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

powderMutations.updateFilesToAdd = (state, selected) => {
  const keys = [];

  state.filesToAdd.forEach((key) => {
    if (selected.indexOf(key) === -1) {
      keys.push(key);
    }
  });

  // eslint-disable-next-line
  state.filesToAdd = selected;
  // eslint-disable-next-line
  state.filesSelected.add = selected;
};

powderMutations.updateFilesToSubtract = (state, selected) => {
  const keys = [];

  state.filesToSubtract.forEach((key) => {
    if (selected.indexOf(key) === -1) {
      keys.push(key);
    }
  });

  // eslint-disable-next-line
  state.filesToSubtract = selected;
  // eslint-disable-next-line
  state.filesSelected.subtract = selected;
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
  state.normalizeByVCorr = {};
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

      const normalizeValue = state.normalizeByVCorr.value[anodeIndex];

      anode.values = anode.values.map((point) => { // eslint-disable-line
        const normalizedPoint = { ...point };
        normalizedPoint.anode /= normalizeValue;

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
};

export default powderMutations;
