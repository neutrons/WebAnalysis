import _ from 'lodash';
import * as d3 from 'd3';

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
    const initialValues = state.fitInitialValues;
    const settings = state.fitSettings;

    return {
      equation,
      transformations,
      initialValues,
      settings,
    };
  },
  getPreparedData: (state) => {
    let temp = state.selectedData.map(el => _.cloneDeep(el.dataTransformed));

    temp = _.flatten(temp);
    temp = temp.filter(d => Number.isFinite(d.y) && Number.isFinite(d.x));

    // Nest the entries by name
    temp = d3.nest()
        .key(d => d.name)
        .entries(temp);

    return temp;
  },
  getChartConfigurations: (state, getters) => {
    const fitSettings = _.cloneDeep(state.fitSettings);
    const data = getters.getPreparedData;
    const scales = state.plotScale;
    const labels = state.label;
    const fileToFit = state.fileToFit;

    return {
      fitSettings,
      fileToFit,
      data,
      scales,
      labels,
    };
  },
  isFilesPlotted: state => state.filesSelected.length > 0,
  isFileFit: state => state.fileToFit !== null,
  fitKeys: state => Object.keys(state.fits),
  getExtent: (state, getters) => (field) => {
    let tempData = _.cloneDeep(getters.getPreparedData);

    if (tempData.length === 0) {
      return 'N/A';
    }

    const yType = state.plotScale.y.label;
    const xType = state.plotScale.x.label;
    tempData = tempData.map(el => el.values)
      .reduce((a, b) => a.concat(b))
      .filter((d) => {
        if (yType === 'log(y)' && xType === 'log(x)') {
          return d.y > 0 && d.x > 0;
        } else if (xType === 'log(x)') {
          return d.x > 0;
        } else if (yType === 'log(y)') {
          return d.y > 0;
        }

        return d;
      });

    const extent = d3.extent(tempData, d => d[field]);

    // If extents are the same, +-1 in order to not plot a flat chart
    if (extent[0] === extent[1]) {
      extent[0] -= 1;
      extent[1] += 1;
    }

    return extent;
  },
  getPlotData: (state, getters) => {
    if (getters.getPreparedData.length === 0) return [];

    return getters.getPreparedData.map(d => d.values).reduce((a, b) => a.concat(b));
  },
  dataToFit: (state, getters) => {
    const temp = [];
    getters.getPreparedData.forEach((el) => {
      if (el.key === state.fileToFit) temp.push(_.cloneDeep(el.values));
    });
    return temp[0] || [];
  },
};

