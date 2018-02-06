import transformDataFunc from '../../../assets/js/transformData';

export default (state) => {
  state.selectedData.forEach((el) => {
    if (state.transformations.x !== 'x' || state.transformations.y !== 'y') {
      // eslint-disable-next-line
      el.dataTransformed = transformDataFunc(el.data, state.transformations);
    } else {
      // eslint-disable-next-line
      el.dataTransformed = _.cloneDeep(el.data);
    }
  });
};
