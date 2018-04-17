import Vue from 'vue';

import addToFetchList from '../../shared/mutations/addToFetchList';
import addUploadFiles from '../../shared/mutations/addUploadFiles';
import removeSavedFile from '../../shared/mutations/removeSavedFile';
import storeData from '../../shared/mutations/storeData';
import updateTags from '../../shared/mutations/updateTags';
import removeSavedPoint from '../../shared/mutations/removeSavedPoint';

export default {
  addToFetchList,
  addUploadFiles,
  storeData,
  updateTags,
  removeSavedFile,
  removeSavedPoint,
  storeNormalizeFiles(state, files) {
    state.normalizeFiles = files; // eslint-disable-line
  },
  addExcludeDetectorData(state, data) {
    Vue.set(state.normalizeFilesData, 'excludeDetectors', data);
  },
  addVCorrData(state, data) {
    Vue.set(state.normalizeFilesData, 'vcorr', data);
  },
};
