import getSavedFile from '../../shared/getters/getSavedFile';
import getURLs from '../../shared/getters/getURLs';
import getCurrentConfiguration from '../../shared/getters/getCurrentConfiguration';
import getChartConfigurations from '../../shared/getters/getChartConfigurations';
import getPreparedData from '../../shared/getters/getPreparedData';
import getExtent from '../../shared/getters/getExtent';
import getPlotData from '../../shared/getters/getPlotData';
import dataToFit from '../../shared/getters/dataToFit';
import isFilesPlotted from '../../shared/getters/isFilesPlotted';
import isFileFit from '../../shared/getters/isFileFit';
import fitKeys from '../../shared/getters/fitKeys';

export default {
  getSavedFile,
  getURLs,
  getCurrentConfiguration,
  getPreparedData,
  getChartConfigurations,
  isFilesPlotted,
  isFileFit,
  fitKeys,
  getExtent,
  getPlotData,
  dataToFit,
  getFields: (state) => {
    if (state.selectedData.length !== 0) {
      return Object.keys(state.selectedData[0].data[0]);
    }

    return [];
  },
  fitNames: state => Object.keys(state.fit),
  getMetadata: (state) => {
    if (!state.filesSelected.length) return null;

    const obj = {};
    state.selectedData.forEach((d) => {
        // eslint-disable-next-line
        obj[d.filename] = [...d.metadata];
    });

    return obj;
  },
};

