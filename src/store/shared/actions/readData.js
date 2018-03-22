export default async ({ state }, blobs) => {
  const promises = blobs.map((blob) => { // eslint-disable-line
    return new Promise((resolve) => {
      const reader = new FileReader();

      // eslint-disable-next-line
      reader.onload = function (e) {
        try {
          // Get file content
          const content = e.target.result;

          resolve({ filename: blob.filename, data: content });
        } catch (error) {
          resolve(error);
        }
      };

      reader.readAsText(blob.blob, 'UTF-8');
    });
  });

  return new Promise((resolve, reject) => {
    if (promises.length > 0) {
      Promise.all(promises).then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
    } else {
      resolve([]);
    }
  });
};
