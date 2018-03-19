import _ from 'lodash';
import transformDataFunc from '../../../assets/js/transformData';

export default (state, chosenData) => {
  const tempData = _.cloneDeep(chosenData);
  const tempSelect = [];

  for (let i = 0, len = tempData.length; i < len; i += 1) {
    const data = tempData[i].data;
    const filename = tempData[i].filename;

    if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
      const dataTransformed = transformDataFunc(data, state.transformations, state.field);

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
  state.selectedData = tempSelect;
};
