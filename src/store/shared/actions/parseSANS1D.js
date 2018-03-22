import pp from 'papaparse';
import config from '../../../assets/js/readFiles/configs/SANS1D';

export default async ({ state }, payload) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      const result = payload.map((item) => {
        const data = item.data;
        const filename = item.filename;

        const results1D = pp.parse(data, config).data;

        results1D.forEach((row) => {
          row.name = filename; // eslint-disable-line
        });

        return { filename, data: results1D };
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
