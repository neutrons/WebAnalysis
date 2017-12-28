/* Function to Parse 1D Data Files */
import pp from 'papaparse';
import config from '../configs/SANS1D';

export default {
  methods: {
    parseData(data, filename) {
      let results1D = pp.parse(data, config).data;

      // Filter out any negative values
      results1D = results1D.filter(row => row.y > 0 && row.x > 0);

      // eslint-disable-next-line
      results1D.forEach((row) => row.name = filename);

      return {
        filename,
        data: results1D,
      };
    },
  },
};
