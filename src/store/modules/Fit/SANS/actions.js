import parseData from '../../../shared/actions/parseSANS1D';
import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import setCurrentData from '../../../shared/actions/setCurrentData';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelected;
actions.setCurrentData = setCurrentData;
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

actions.setXTransformation = async ({ commit }, x) =>
  new Promise((resolve, reject) => {
    try {
      commit('setXTransformation', x);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

actions.setYTransformation = async ({ commit }, y) =>
  new Promise((resolve, reject) => {
    try {
      commit('setYTransformation', y);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

actions.transformData = async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('transformData');
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

actions.resetTransformations = async ({ commit }) =>
  new Promise((resolve, reject) => {
    try {
      commit('resetTransformations');
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

actions.setFitType = async ({ commit }, type = 'Linear') =>
  new Promise((resolve, reject) => {
    try {
      commit('setFitType', type);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

export default actions;
