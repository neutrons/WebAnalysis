import _ from 'lodash';
import * as d3 from 'd3';
import transformDataFunc from '../../../assets/js/transformData';
import fits from '../../fits/SANS1D';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

mutations.resetAll = (st) => {
  /* eslint-disable */
  st.selectedData = [];
  st.fileToFit = null;
  st.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  st.transformations = {
    x: 'x',
    y: 'y',
  };
  st.label = {
    x: 'q = x',
    y: 'I(q) = y',
  };
  st.deleteKeys = [];
  st.fittedData = [];
  st.filteredData = [];
  st.brushSelection = [];
  /* eslint-enable */
};

mutations.setCurrentData = (st, chosenData) => {
  const tempData = _.cloneDeep(chosenData);
  const tempSelect = [];

  for (let i = 0, len = tempData.length; i < len; i += 1) {
    const data = tempData[i].data;
    const filename = tempData[i].filename;

    if (st.transformations.x !== 'x' || st.transformations.y !== 'y') {
      const dataTransformed = transformDataFunc(data, st.transformations);

      tempSelect.push({
        filename,
        data,
        dataTransformed,
      });
    } else {
      const dataTransformed = _.cloneDeep(data);

      tempSelect.push({
        filename,
        data,
        dataTransformed,
      });
    }
  }

  // eslint-disable-next-line
  st.selectedData = tempSelect;
};

mutations.setFitType = (st, type = state.fitType) => {
  /* eslint-disable */
  st.fitType = type;
  st.fitEquation = st.fits[type].equation;
  st.transformations.x = st.fits[type].transformations.x;
  st.label.x = `q = ${st.transformations.x}`;
  st.transformations.y = st.fits[type].transformations.y;
  st.label.y = `I(q) = ${st.transformations.y}`;
  st.transformations.error = st.fits[type].transformations.error;
  st.fitInitialValues = _.cloneDeep(st.fits[type].initialValues);
  st.fitNote = st.fits[type].note;
  /* eslint-enable */
};


state.label = {
  x: 'q = x',
  y: 'I(q) = y',
};

state.transformations = {
  x: 'x',
  y: 'y',
  error: 'error',
};

state.fits = { ...fits };

state.field = {
  x: 'x',
  y: 'y',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
