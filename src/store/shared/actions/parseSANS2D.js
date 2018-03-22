import pp from 'papaparse';
import config from '../../../assets/js/readFiles/configs/SANS2D';

export default async ({ state }, payload) => { // eslint-disable-line
  return new Promise((resolve, reject) => {
    try {
      const result = payload.map((item) => {
        const data = item.data;
        const filename = item.filename;

        const results = pp.parse(data, config).data;

        results.forEach((row) => {
          row.name = filename; // eslint-disable-line
        });

        return { filename, data: results };
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
