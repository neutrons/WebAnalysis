import axios from 'axios';

export default async ({ state }, urls) => {
  const promises = urls.map((url) => { // eslint-disable-line
    return axios.get(url.url)
      .then((result) => { // eslint-disable-line
        return {
          filename: url.filename,
          data: result.data,
        };
      });
  });

  return new Promise((resolve, reject) => {
    if (promises.length > 0) {
      Promise.all(promises).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    } else {
      resolve([]);
    }
  });
};
