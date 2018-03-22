// Mutations specifically for the equation editor component and fit module
export const addToSelect = async ({ commit }, value) => {
  commit('addToSelect', value);
  return Promise.resolve(true);
};

export const updateSelectAtIndex = async ({ commit }, payload) => {
  commit('updateSelectAtIndex', payload);
  return Promise.resolve(true);
};

export const removeSelectAtIndex = async ({ commit }, index) => {
  commit('removeSelectAtIndex', index);
  return Promise.resolve(true);
};

export const updateInitialValue = async ({ commit }, payload) => {
  commit('updateInitialValue', payload);
  return Promise.resolve(true);
};

export const addCoefficientValue = async ({ commit }, payload) => {
  commit('addCoefficientValue', payload);
  return Promise.resolve(true);
};

export const removeInitialValues = async ({ commit }, payload) => {
  commit('removeInitialValues', payload);
  return Promise.resolve(true);
};

export const addInitialValues = async ({ commit }, payload) => {
  commit('addInitialValues', payload);
  return Promise.resolve(true);
};

export const setSelectValid = async ({ commit }, payload) => {
  commit('setSelectValid', payload);
  return Promise.resolve(true);
};

export const setSelectEquation = async ({ commit }, payload) => {
  commit('setSelectEquation', payload);
  return Promise.resolve(true);
};

export const setCoefficientConstant = async ({ commit }, payload) => {
  commit('setCoefficientConstant', payload);
  return Promise.resolve(true);
};

export const updateEquationEditInitialValues = async ({ commit }, item) => {
  commit('updateEquationEditInitialValues', item);
  return Promise.resolve(true);
};

export const setEquationEditSelect = async ({ commit }, value) => {
  commit('setEquationEditSelect', value);
  return Promise.resolve(true);
};
