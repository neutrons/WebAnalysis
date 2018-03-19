import _ from 'lodash';

export default (state, chosenData) => {
  // set default fields to base curve
  if (chosenData.length === 1 || !state.isFieldChange) state.field = { ...chosenData[0].defaultFields }; // eslint-disable-line

  const tempData = _.cloneDeep(chosenData);
  const tempSelect = [];
  const yField = state.field.y;

  for (let i = 0, len = tempData.length; i < len; i += 1) {
    const result = {};
    const data = _.cloneDeep(tempData[i].data);
    const filename = tempData[i].filename;
    const metadata = [...tempData[i].metadata];
    const dataTransformed = _.cloneDeep(data)
      .map(d => ({
        ...d,
        error: d[yField] < 0 ? 0 : Math.sqrt(d[yField]),
      }));

    const defaultFields = { ...tempData[i].defaultFields };

    if (typeof state.filesToAdd !== 'undefined') {
      result.type = state.filesToAdd.indexOf(filename) === -1 ? 'subtract' : 'add';
    }

    result.data = data;
    result.dataTransformed = dataTransformed;
    result.filename = filename;
    result.metadata = metadata;
    result.defaultFields = defaultFields;

    tempSelect.push(result);
  }

  // eslint-disable-next-line
  state.selectedData = tempSelect;
};
