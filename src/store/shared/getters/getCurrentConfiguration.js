export default (state) => {
  const equation = state.fitEquation;
  const transformations = state.transformations;
  const initialValues = state.fitInitialValues;
  const settings = state.fitSettings;

  return {
    equation,
    transformations,
    initialValues,
    settings,
  };
};
