import parseData from '../../../shared/actions/parseSANS1D';
import updateFilesSelectedSANS from '../../../shared/actions/updateFilesSelectedSANS';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelectedSANS;

actions.parseData = parseData;

actions.updateFileToFit = async ({ state, commit, dispatch }, file) => { // eslint-disable-line
  // Check if file to fit is null reset fitted and filtered data
  // if it is reset configurations else set new file to fit
  return new Promise((resolve, reject) => {
    if (file === null) {
      dispatch('resetFitConfiguration')
        .then(dispatch('resetFittedData'))
        .then(dispatch('resetBrushSelection'))
        .then(dispatch('transformData'))
        .then(() => {
          commit('updateFileToFit', file);
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    }

    commit('updateFileToFit', file);
    resolve(true);
  });
};

actions.setXTransformation = async ({ commit }, x) => {
  commit('setXTransformation', x);
  return Promise.resolve(true);
};

actions.setYTransformation = async ({ commit }, y) => {
  commit('setYTransformation', y);
  return Promise.resolve(true);
};

actions.transformData = async ({ commit }) => {
  commit('transformData');
  return Promise.resolve(true);
};

actions.resetTransformations = async ({ commit }) => {
  commit('resetTransformations');
  return Promise.resolve(true);
};

actions.setFitType = async ({ commit }, type = 'Linear') => {
  commit('setFitType', type);
  return Promise.resolve(true);
};

export default actions;
