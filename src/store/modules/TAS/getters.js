import _ from 'lodash';

export default {
  getXScales: state => state.scale.x,
  getYScales: state => state.scale.y,
  getPlotScaleX: state => state.plotScale.x,
  getPlotScaleY: state => state.plotScale.y,
  getFilesToPlot: state => state.filesToPlot,
  getFileToFit: state => state.fileToFit,
  getSavedFile: state => (file) => {
    const temp = state.saved[file];

    if (temp === undefined) {
      return '999';
    }

    return _.cloneDeep(temp);
  },
  getURLs: state => (files) => {
    const tempURLs = [];
    const fetchList = [];
    const uploadList = [];

    const fetchedFiles = state.fetched;
    const fetchKeys = Object.keys(fetchedFiles);
    const uploadedFiles = state.uploaded;
    const uploadKeys = Object.keys(uploadedFiles);

    for (let i = 0, len = files.length; i < len; i += 1) {
      const fname = files[i];
      const inFetch = fetchKeys.indexOf(fname) > -1;

      if (inFetch) {
        fetchList.push(files[i]);
      } else {
        uploadList.push(files[i]);
      }
    }

    if (fetchList.length > 0) {
      fetchKeys.forEach((key) => {
        const temp = fetchedFiles[key];

        if (fetchList.indexOf(key) > -1) {
          tempURLs.push({
            type: 'fetched',
            url: temp.url,
            filename: temp.filename,
            tags: temp.tags,
          });
        }
      });
    }

    if (uploadList.length > 0) {
      uploadKeys.forEach((key) => {
        const temp = uploadedFiles[key];

        if (uploadList.indexOf(key) > -1) {
          tempURLs.push({
            type: 'uploaded',
            url: temp.blob,
            filename: temp.filename,
            tags: temp.tags,
          });
        }
      });
    }

    return tempURLs;
  },
  getCurrentConfiguration: (state) => {
    const equation = state.fitEquation;
    const transformations = state.transformations;
    const initialValues = state.initialValues;
    const settings = state.fitSetting;

    return {
      equation,
      transformations,
      initialValues,
      settings,
    };
  },
};
