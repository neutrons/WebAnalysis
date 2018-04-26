import Vue from 'vue';
import _ from 'lodash';

export default (state, payload) => {
  const length = payload.length;
  console.log('store data', payload);
  for (let i = 0; i < length; i += 1) {
    const filename = payload[i].filename;
    const data = payload[i];

    Vue.set(state.saved, filename, _.cloneDeep(data));
  }
};
