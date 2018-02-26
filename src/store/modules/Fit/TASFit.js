import _ from 'lodash';
import * as d3 from 'd3';
import swapFields from '../../../assets/js/swapFields';
import fits from '../../fits/TAS';

import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

mutations.resetAll = (st) => {
  /* eslint-disable */
  st.selectedData = [];
  st.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  st.transformations = {
    x: 'x',
    y: 'y',
  };
  st.field = {
    x: 'pt',
    y: 'detector',
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
    const data = _.cloneDeep(tempData[i].data);
    const filename = tempData[i].filename;
    const metadata = [...tempData[i].metadata];
    const dataTransformed = swapFields(data, st.field);

    tempSelect.push({
      data,
      dataTransformed,
      filename,
      metadata,
    });
  }

  // eslint-disable-next-line
  st.selectedData = tempSelect;
};

mutations.setFitType = (st, type = state.fitType) => {
  /* eslint-disable */
  st.fitType = type;
  st.fitEquation = st.fits[type].equation;
  st.fitInitialValues = _.cloneDeep(st.fits[type].initialValues);
  /* eslint-enable */
};

getters.fitNames = st => Object.keys(st.fit);

state.label = {
  x: 'q = x',
  y: 'I(q) = y',
};
state.fit = { ...fits };
state.field = {
  x: 'pt',
  y: 'detector',
};
state.fits = { ...fits };

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
