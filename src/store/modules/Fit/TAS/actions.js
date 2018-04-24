import parseData from '../../../shared/actions/parseTAS';
import updateFilesSelected from '../../../shared/actions/updateFilesSelected';
import setCurrentData from '../../../shared/actions/setCurrentData';
import { setYField, setXField } from '../../../shared/actions/fields';

import actions from '../actions';

actions.updateFilesSelected = updateFilesSelected;
actions.setCurrentData = setCurrentData;
actions.setYField = setYField;
actions.setXField = setXField;

actions.updateFileToFit = async ({ state, commit, dispatch }, file) => { // eslint-disable-line
  // Check if file to fit is null reset fitted and filtered data
  // if it is reset configurations else set new file to fit
  return new Promise((resolve, reject) => {
    if (file === null) {
      dispatch('resetFitConfiguration')
        .then(dispatch('resetFittedData'))
        .then(dispatch('resetBrushSelection'))
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

actions.parseData = parseData;

export default actions;
