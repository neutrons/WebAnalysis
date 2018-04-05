import _ from 'lodash';

export default async ({ state, dispatch, commit, rootGetters }, payload) => {
  const filelist = [...payload.filelist];
  const group = payload.group;

  // if filelist is empty
  if (filelist.length === 0) return dispatch('resetAll');

  // First Update File List
  commit('updateFilesSelected', filelist);

  // Next Get Stored Data
  const [storedData, nonStoredFiles] = rootGetters[`${group}/getStoredData`](filelist);

  // Next Get File References, either url to fetch or blob to file read
  const [urls, blobs] = rootGetters[`${group}/getURLs`](nonStoredFiles);

  // Next Get data for URLs - either fetched or file reader
  const fetchData = await dispatch('fetchData', urls);
  const readData = await dispatch('readData', blobs);

  // Next Parse Data
  const dataToParse = _.flatten([fetchData, readData]);
  const parsedData = await dispatch('parseData', dataToParse);

  // Next Store Data
  commit(`${group}/storeData`, parsedData, { root: true });

  // Next Set Current Data
  const finalData = _.flatten([storedData, parsedData]);
  commit('setCurrentData', finalData);

  return true;
};
