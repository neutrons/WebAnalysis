import * as d3 from 'd3';
import setCurrentData from '../../../shared/mutations/setCurrentDataTAS';

import mutations from '../mutations';

mutations.setCurrentData = setCurrentData;

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.selectedData = [];
  state.plotScale = {
    x: { label: 'x', value: d3.scaleLinear() },
    y: { label: 'y', value: d3.scaleLinear() },
  };
  state.field = {
    x: 'x',
    y: 'y',
  };
  state.label = {
    x: 'x',
    y: 'y',
  };
  state.fittedData = [];
  state.filteredData = [];
  state.brushSelection = [];
  state.isDifferentFields = false;
  state.isFieldChange = false;
  state.equationEditSelect = [];
  state.fileToFit = null;
  /* eslint-enable */
};

mutations.setFitType = (state, type = 'Linear') => {
  state.fitType = type; // eslint-disable-line
};

export default mutations;
