import _ from 'lodash';

export default async ({ state, dispatch, commit, getters, rootGetters }, payload) => {
  if (payload.type === 'add') {
    commit('updateFilesToAdd', [...payload.files]);
  } else {
    commit('updateFilesToSubtract', [...payload.files]);
  }

  const filelist = [...getters.mergedFiles];

  // if there are no files selected
  // reset all
  if (filelist.length === 0) {
    return dispatch('resetAll');
  }

  // if selected files is fewer than 2
  // remove combined data
  if (state.isNormalized || state.combinedData.length > 0) commit('resetNormalizedData');

  // Next Get Stored Data
  const [storedData, nonStoredFiles] = rootGetters['TAS/getStoredData'](filelist);

  // Next Get File References, either url to fetch or blob to file read
  const [urls, blobs] = rootGetters['TAS/getURLs'](nonStoredFiles);

  // Next Get data for URLs - either fetched or file reader
  const fetchData = await dispatch('fetchData', urls);
  const readData = await dispatch('readData', blobs);

  // Next Parse Data
  const dataToParse = _.flatten([fetchData, readData]);
  const parsedData = await dispatch('parseData', dataToParse);

  // Next Store Data
  commit('TAS/storeData', parsedData, { root: true });

  // Next Set Current Data
  const finalData = _.flatten([storedData, parsedData]);
  commit('setCurrentData', finalData);

  return true;
};
