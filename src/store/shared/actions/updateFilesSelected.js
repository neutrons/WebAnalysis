import _ from 'lodash';

export default async ({ state, dispatch, commit, rootGetters }, payload) => {
  const filelist = [...payload.filelist];
  const group = payload.group;

  // if filelist is empty
  if (filelist.length === 0) return dispatch('resetAll');

  // First Update File List
  commit('updateFilesSelected', filelist);

  // if selected files is fewer than 2 remove combined data
  // this is only for the combine data modules
  if (
    (typeof state.isNormalized !== 'undefined' && typeof state.combinedData !== 'undefined') &&
    (state.isNormalized || state.combinedData.length > 0)
  ) commit('resetNormalizedData');

  // Next Get Stored Data
  const [storedData, nonStoredFiles] = rootGetters[`${group}/getStoredData`](filelist);

  // Next Get File References, either url to fetch or blob to file read
  const [urls, blobs] = rootGetters[`${group}/getURLs`](nonStoredFiles);

  console.log('urls', urls);
  console.log('blobs', blobs);
  // Next Get data for URLs - either fetched or file reader
  const fetchData = await dispatch('fetchData', urls);
  const readData = await dispatch('readData', blobs);

  // Next Parse Data
  const dataToParse = _.flatten([fetchData, readData]);
  const parsedData = await dispatch('parseData', dataToParse);

  console.log('data to parse', dataToParse);
  console.log('parsed data', parsedData);
  // Next Store Data
  commit(`${group}/storeData`, parsedData, { root: true });

  // Finally Set Current Data
  const finalData = _.flatten([storedData, parsedData]);
  console.log('final data', finalData);
  dispatch('setCurrentData', finalData);

  return true;
};
