import _ from 'lodash';
import { mean } from 'd3';

import parseData from '../../shared/actions/parseTAS';
import fetchData from '../../shared/actions/fetchData';
import readData from '../../shared/actions/readData';

// Function to calculate the averages for every column in a data file
function getAverages(data) {
  const result = {};
  const tempData = _.cloneDeep(data);
  let keys = Object.keys(data[0]);

  // filter out for anode and filename
  keys = keys.filter(key => !key.match(/^(anode\d+|name$)/));

  keys.forEach((property) => {
    const avg = mean(tempData, d => d[property]); // use d3 mean package
    const pName = `Avg(${property})`;
    result[pName] = Math.round(avg * 3) / (10 ** 3); // round to 3 decimal places
  });

  return result;
}

const actions = {
  parseData,
  fetchData,
  readData,
  async getRunsData({ state, dispatch, commit, rootState, rootGetters }, group) {
    // First toggle state to getting runs data
    commit('setIsGettingRunsData', true);

    // Get uploaded & fetched files into a list
    const fetchFiles = Object.keys(rootState[group].fetched);
    const uploadFiles = Object.keys(rootState[group].uploaded);
    const fileList = fetchFiles.concat(uploadFiles);

    // Next Get Stored Data
    const [storedData, nonStoredFiles] = rootGetters[`${group}/getStoredData`](fileList);

    // Next Get File References, either url to fetch or blob to file read
    const [urls, blobs] = rootGetters[`${group}/getURLs`](nonStoredFiles);

    // Next Get data for URLs - either fetched or file reader
    const dataFetched = await dispatch('fetchData', urls);
    const dataRead = await dispatch('readData', blobs);

    // Next Parse Data
    const dataToParse = _.flatten([dataFetched, dataRead]);
    const parsedData = await dispatch('parseData', dataToParse);

    // Next Store Data
    commit(`${group}/storeData`, parsedData, { root: true });

    // Finally Set Current Data
    const finalData = _.flatten([storedData, parsedData]);

    // Next take data and filter for metadata
    const runsData = finalData.map((file) => {
      const averages = getAverages(file.data);
      const newMetadata = { ...file.metadata, ...averages };

      return { filename: file.filename, metadata: newMetadata };
    });

    // Next commit mutation to set Runs Data
    commit('setRunsData', runsData);

    return true;
  },
};


export default actions;
