import _ from 'lodash';

export default async ({ state, dispatch, commit, getters }, filelist) => {
  // if no files selected reset simply reset everything
  if (filelist.length === 0) {
    return dispatch('resetAll');
  }

  const file = filelist.length === 0 ? null : filelist[0];

  // First Update File List
  commit('updateFilesSelected', file);

  // Next Get Stored Data
  const [storedData, nonStoredFiles] = getters.getStoredData(filelist);

  // Next Get File References, either url to fetch or blob to file read
  const [urls, blobs] = getters.getURLs(nonStoredFiles);

  // Next Get data for URLs - either fetched or file reader
  const fetchData = await dispatch('fetchData', urls);
  const readData = await dispatch('readData', blobs);

  // Next Parse Data
  const dataToParse = _.flatten([fetchData, readData]);
  const parsedData = await dispatch('parseData', dataToParse);

  // Next Store Data
  commit('storeData', parsedData);

  // Next Set Current Data
  const finalData = _.flatten([storedData, parsedData]);
  commit('setCurrentData', finalData);

  return true;
};
