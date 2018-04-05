import _ from 'lodash';

export default async ({ state, dispatch, commit, rootGetters }, payload) => {
  // if filelist is empty
  if (payload.length === 0) return dispatch('resetAll');

  const filelist = [...payload];

  // First Update File List
  commit('updateFilesSelected', filelist);

  // Next Get Stored Data
  const [storedData, nonStoredFiles] = rootGetters['POWDER/getStoredData'](filelist);

  // Next Get File References, either url to fetch or blob to file read
  const [urls, blobs] = rootGetters['POWDER/getURLs'](nonStoredFiles);

  // Next Get data for URLs - either fetched or file reader
  const fetchData = await dispatch('fetchData', urls);
  const readData = await dispatch('readData', blobs);

  // Next Parse Data
  const dataToParse = _.flatten([fetchData, readData]);
  const parsedData = await dispatch('parseData', dataToParse);

  // Next Store Data
  commit('POWDER/storeData', parsedData, { root: true });

  // Next Set Current Data
  const finalData = _.flatten([storedData, parsedData]);
  commit('setCurrentData', finalData);

  return true;
};
