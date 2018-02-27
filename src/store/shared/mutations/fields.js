import _ from 'lodash';
import swapFields from '../../../assets/js/swapFields';

export const setXField = (state, value) => {
  // eslint-disable-next-line
  state.field.x = value;
};

export const setYField = (state, value) => {
  // eslint-disable-next-line
  state.field.y = value;
};

export const changeFields = (state) => {
  const tempSelect = [];

  state.selectedData.forEach((d) => {
    const data = _.cloneDeep(d.data);
    const metadata = [...d.metadata];
    const filename = d.filename;
    const dataTransformed = swapFields(data, state.field);

    tempSelect.push({
      data,
      dataTransformed,
      filename,
      metadata,
    });
  });

  // eslint-disable-next-line
  state.selectedData = tempSelect;
};
