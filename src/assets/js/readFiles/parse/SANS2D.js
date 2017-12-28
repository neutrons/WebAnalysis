import pp from 'papaparse';
import config from '../configs/SANS2D';

export default {
  methods: {
    parseData(data) {
      const results2D = pp.parse(data, config);

      return results2D;
    },
  },
};
