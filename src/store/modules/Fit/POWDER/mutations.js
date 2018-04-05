import * as d3 from 'd3';
import setCurrentData from '../../../shared/mutations/setCurrentDataTAS';
import { setYField, setXField } from '../../../shared/mutations/fields';

import mutations from '../mutations';

mutations.setCurrentData = setCurrentData;
mutations.setYField = setYField;
mutations.setXField = setXField;

mutations.resetAll = (state) => {
  /* eslint-disable */
  state.filters = [];
  state.filesSelected = [];
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
  state.brushSelection = [];
  state.isDifferentFields = false;
  state.isFieldChange = false;
  /* eslint-enable */
};

export default mutations;
