// Mutations specifically for the equation editor component and fit module

// add new equation to list
export const addToSelect = async ({ commit }, value) =>
  new Promise((resolve, reject) => {
    try {
      commit('addToSelect', value);
    } catch (error) {
      reject(error);
    }
  });

// update equation information
export const updateSelectAtIndex = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('updateSelectAtIndex', payload);
    } catch (error) {
      reject(error);
    }
  });

// remove equation from list
export const removeSelectAtIndex = async ({ commit }, index) =>
  new Promise((resolve, reject) => {
    try {
      commit('removeSelectAtIndex', index);
    } catch (error) {
      reject(error);
    }
  });

// update initial values for a specified equation in the list
export const updateInitialValue = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('updateInitialValue', payload);
    } catch (error) {
      reject(error);
    }
  });

// add coefficient values for a specified equation in the list
export const addCoefficientValue = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('addCoefficientValue', payload);
    } catch (error) {
      reject(error);
    }
  });

// remove initial value for a specified equation in the list
export const removeInitialValues = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('removeInitialValues', payload);
    } catch (error) {
      reject(error);
    }
  });

// add initial value for a specfied equation in the list
export const addInitialValues = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('addInitialValues', payload);
    } catch (error) {
      reject(error);
    }
  });

// label whether specified equation in list is a valid entry
export const setSelectValid = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('setSelectValid', payload);
    } catch (error) {
      reject(error);
    }
  });

// change equation specified in the list
export const setSelectEquation = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('setSelectEquation', payload);
    } catch (error) {
      reject(error);
    }
  });

// toggle whether coefficient will be constant for a given equation in the list
export const setCoefficientConstant = async ({ commit }, payload) =>
  new Promise((resolve, reject) => {
    try {
      commit('setCoefficientConstant', payload);
    } catch (error) {
      reject(error);
    }
  });

// edit initial value for a specified equation in the list
export const updateEquationEditInitialValues = async ({ commit }, item) =>
  new Promise((resolve, reject) => {
    try {
      commit('updateEquationEditInitialValues', item);
    } catch (error) {
      reject(error);
    }
  });

// update the equation in the list
export const setEquationEditSelect = async ({ commit }, value) =>
  new Promise((resolve, reject) => {
    try {
      commit('setEquationEditSelect', value);
    } catch (error) {
      reject(error);
    }
  });
